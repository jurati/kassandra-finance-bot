const logger = require("../modules/Logger.js");
const { getSettings } = require("../modules/functions.js");
const { request, GraphQLClient } = require('graphql-request')
const config = require('../config');
const {createProposalMessageEmbed} = require("../components/ProposalMessageEmbed");
const {setNickname} = require("../components/Nickname");

const gqlClient = new GraphQLClient(config.url, { headers: {} })
let lastCreated = Math.floor(Date.now() / 1000);

module.exports = async client => {
  // Log that the bot is online.
  logger.log(`${client.user.tag}, ready to serve ${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)} users in ${client.guilds.cache.size} servers.`, "ready");
  
  // Make the bot "play the game" which is the help command with default prefix.
  client.user.setActivity(`${getSettings("default").prefix}help`, { type: "PLAYING" });
  let channel = client.channels.cache.get(process.env.CHANNEL_ID)

  setInterval(function() {
    gqlClient.request(config.query.proposals, {take: 5, skip: 0}).then((data) => {
      let proposals = data.proposals.filter(proposal => proposal.created > lastCreated);

      for (const proposal of proposals.reverse()) {
        createProposalMessageEmbed(proposal)
        channel.send({embeds: [createProposalMessageEmbed(proposal)]})
        lastCreated = proposal.created
      }
    })
    setNickname(channel.guild.members.cache.get(client.user.id))
  }, 30 * 1000)
};
