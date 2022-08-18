const {MessageEmbed} = require("discord.js");
const config = require("../config");

function createProposalMessageEmbed(proposal) {
    const parts = proposal.description.split('\n')
    const title = parts[0].replace(/[^a-zA-Z0-9 \']/g, '')
    const bodyParts = parts.shift()
    const body = parts.join('\n')

    const result = new MessageEmbed()
        .setColor('#4F7EE6')
        .setTitle(`#${proposal.number}: ${title}`)
        .setURL('https://app.kassandra.finance/gov/proposals')
        .setDescription(body)

    return result
}

module.exports = { createProposalMessageEmbed };