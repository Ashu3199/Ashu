const express = require('express');
const router = express.Router();
const Contact = require('../models/contact.model');

// Route to identify or create a contact based on email or phone number
router.post('/identify', async (req, res) => {
    try {
        const { email, phoneNumber } = req.body; // Extract email and phone number from the request body

        // Search for contacts with matching email or phone number
        let matchingContacts = await Contact.find({
            $or: [
                { email: email },       // Check if email exists
                { phoneNumber: phoneNumber }, // Check if phone number exists
            ],
        });

        // If no matching contacts are found, create a new primary contact
        if (matchingContacts.length === 0) {
            const newContact = await Contact.create({
                email,
                phoneNumber,
                linkPrecedence: 'primary', // Mark this contact as the primary
            });

            // Return the new contact details
            return res.status(200).json({
                primaryContactId: newContact._id,
                emails: [newContact.email].filter(Boolean),
                phoneNumbers: [newContact.phoneNumber].filter(Boolean),
                secondaryContactIds: [], // No secondary contacts since this is the first one
            });
        }

        // Find the primary contact (either explicitly marked or the first contact)
        let primaryContact =
            matchingContacts.find((c) => c.linkPrecedence === 'primary') ||
            matchingContacts[0];

        // Get IDs of all secondary contacts (excluding the primary contact)
        const secondaryContactIds = matchingContacts
            .filter((c) => c._id.toString() !== primaryContact._id.toString())
            .map((c) => c._id);

        // If the email and phone number are new, create a secondary contact
        if (!matchingContacts.some((c) => c.email === email && c.phoneNumber === phoneNumber)) {
            const newSecondary = await Contact.create({
                email,
                phoneNumber,
                linkedId: primaryContact._id, // Link to the primary contact
                linkPrecedence: 'secondary', // Mark this as a secondary contact
            });
            secondaryContactIds.push(newSecondary._id); // Add the new secondary contact's ID
        }

        // Combine all unique emails from matching contacts and the current email
        const allEmails = Array.from(
            new Set(
                matchingContacts.map((c) => c.email).concat(email).filter(Boolean)
            )
        );

        // Combine all unique phone numbers from matching contacts and the current phone number.
        const allPhoneNumbers = Array.from(
            new Set(
                matchingContacts
                    .map((c) => c.phoneNumber)
                    .concat(phoneNumber)
                    .filter(Boolean)
            )
        );

        // Respond with the primary contact details and linked contacts
        res.status(200).json({
            primaryContactId: primaryContact._id,
            emails: allEmails,
            phoneNumbers: allPhoneNumbers,
            secondaryContactIds,
        });
    } catch (error) {
        // Handle errors and respond with a 500 status code
        console.error('Error in /identify:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Export the router to be used in other parts of the application
module.exports = router;
