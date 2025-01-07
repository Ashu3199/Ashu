const express = require('express');
const router = express.Router();
const Contact = require('../models/contact.model');

router.post('/identify', async (req, res) => {
    try {
        const { email, phoneNumber } = req.body;

        let matchingContacts = await Contact.find({
            $or: [
                { email: email },
                { phoneNumber: phoneNumber },
            ],
        });

        if (matchingContacts.length === 0) {
            const newContact = await Contact.create({
                email,
                phoneNumber,
                linkPrecedence: 'primary',
            });
            return res.status(200).json({
                primaryContactId: newContact._id,
                emails: [newContact.email].filter(Boolean),
                phoneNumbers: [newContact.phoneNumber].filter(Boolean),
                secondaryContactIds: [],
            });
        }

        let primaryContact =
            matchingContacts.find((c) => c.linkPrecedence === 'primary') ||
            matchingContacts[0];

        const secondaryContactIds = matchingContacts
            .filter((c) => c._id.toString() !== primaryContact._id.toString())
            .map((c) => c._id);

        if (
            !matchingContacts.some(
                (c) => c.email === email && c.phoneNumber === phoneNumber
            )
        ) {
            const newSecondary = await Contact.create({
                email,
                phoneNumber,
                linkedId: primaryContact._id,
                linkPrecedence: 'secondary',
            });
            secondaryContactIds.push(newSecondary._id);
        }

        const allEmails = Array.from(
            new Set(
                matchingContacts.map((c) => c.email).concat(email).filter(Boolean)
            )
        );
        const allPhoneNumbers = Array.from(
            new Set(
                matchingContacts
                    .map((c) => c.phoneNumber)
                    .concat(phoneNumber)
                    .filter(Boolean)
            )
        );

        res.status(200).json({
            primaryContactId: primaryContact._id,
            emails: allEmails,
            phoneNumbers: allPhoneNumbers,
            secondaryContactIds,
        });
    } catch (error) {
        console.error('Error in /identify:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
