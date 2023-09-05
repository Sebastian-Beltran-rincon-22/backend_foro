// Import necessary models
const Interactions = require('../../models/PublicationsModels/interactions');
const Publication = require('../../models/PublicationsModels/publications');
const interactions = require('../../models/PublicationsModels/interactions');

// Define a controllers object for interactions
const interacControllers = {
    // Function to create a new interaction
    create: async (req, res) => {
        try {
            // Extract data from the request (client)
            const { publicationId, reactions, comments, shares } = req.body;

            // Print the Publication ID to the console
            console.log("PublicationID:", publicationId);

            // Find the corresponding publication
            const publication = await Publication.findById(publicationId);
            if (!publication) {
                // If the publication is not found, respond with an error
                return res.status(404).json({ error: 'This action is not possible' });
            }

            // Create a new interaction using the Interactions model
            await Interactions.create({
                publication: publication._id,
                reactions: reactions,
                comments: comments,
                shares: shares
            });

            // Print a message to the console
            console.log('Interaction created');

            // Create a response with details of the new interaction
            const response = {
                msg: 'New interaction created',
                interactions: {
                    _id: interactions._id, // Error: should be interaction._id
                    reactions: interactions.reactions,
                    comments: interactions.comments,
                    shares: interactions.shares
                }
            };

            // Send the response to the client
            res.json({ response });
        } catch (error) {
            // If an error occurs, respond with a server error
            return res.status(500).json({ msg: error.message });
        }
    },
    
    // Function to get all interactions
    getInreract: async (req, res) => {
        try {
            // Find and respond with all interactions
            const interactions = await Interactions.find({});
            res.json(interactions);
        } catch (error) {
            // If an error occurs, respond with a server error
            return res.status(500).json({ msg: error.message });
        }
    },
    
    // Function to get an interaction by its ID
    getInteraById: async (req, res) => {
        try {
            const { id } = req.params;
            // Find the interaction by ID and respond with it
            const interaction = await Interactions.findById(id);
            res.json(interaction);
        } catch (error) {
            // If an error occurs, respond with a server error
            return res.status(500).json({ msg: error.message });
        }
    },
    
    // Function to update an interaction
    updateInterac: async (req, res) => {
        try {
            const { id } = req.params;
            const { reactions, comments, publicationId, shares } = req.body;

            // Update the interaction using its ID
            await Interactions.findByIdAndUpdate(id, {
                publicationId: publicationId._id,
                reactions: reactions,
                comments: comments,
                shares: shares
            });

            // Respond with a success message
            res.json({ msg: 'Update' });
            console.log(Interactions); // This could be an unnecessary print
        } catch (error) {
            // If an error occurs, respond with a client error
            return res.status(404).json({ msg: error.message });
        }
    },
    
    // Function to delete an interaction by its ID
    deleteInterac: async (req, res) => {
        try {
            const { id } = req.params;
            // Find and delete the interaction by its ID
            await Interactions.findByIdAndDelete(id);
            // Respond with a success message
            res.json({ msg: 'Deleted' });
        } catch (error) {
            // If an error occurs, respond with a client error
            return res.status(400).json({ msg: error.message });
        }
    },

    incrementarLike: async (req, res) => {
        try {
            const { id } = req.params;

        // Encuentra la interacción por su ID
            const interaction = await Interactions.findById(id);

            if (!interaction) {
                return res.status(404).json({ error: 'Interacción no encontrada' });
            }

        // Incrementa el contador de likes
            interaction.likes += 1;

        // Guarda la interacción actualizada
            await interaction.save();

        // Responde con el nuevo contador de likes
            res.json({ likes: interaction.likes });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

// Function para obtener el contador de likes
    obtenerLikes: async (req, res) => {
        try {
            const { id } = req.params;

        // Encuentra la interacción por su ID
            const interaction = await Interactions.findById(id);

            if (!interaction) {
                return res.status(404).json({ error: 'Interacción no encontrada' });
        }

        // Responde con el contador de likes actual
            res.json({ likes: interaction.likes });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    
    eliminarLike: async (req, res) => {
        try {
            const { id } = req.params;
    
            // Encuentra la interacción por su ID
            const interaction = await Interactions.findById(id);
    
            if (!interaction) {
                return res.status(404).json({ error: 'Interacción no encontrada' });
            }
    
            // Verifica si el contador de likes es mayor que cero antes de restar
            if (interaction.likes > 0) {
                interaction.likes -= 1;
            }
    
            // Guarda la interacción actualizada
            await interaction.save();
    
            // Responde con el nuevo contador de likes
            res.json({ likes: interaction.likes });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
}
// Export the controllers object
module.exports = interacControllers;
