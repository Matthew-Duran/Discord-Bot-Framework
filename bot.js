const { CommandoClient } = require('discord.js-commando');
const config = require('./config');
const structureHandler = require('./src/handlers/structureHandler.js');
const serviceHandler = require('./src/handlers/serviceHandler.js');
const commandHandler = require('./src/handlers/commandHandler.js');
const dataHandler = require('./src/handlers/dataHandler.js');
const contextGenerator = require('./src/contextGenerator.js');
const logger = require('./src/utilities/logger.js');

module.exports = {
  async start() {
    structureHandler.initialize();

    const client = new CommandoClient({
      owner: config.owners,
      commandPrefix: config.defaultPrefix,
      nonCommandEditable: false,
      commandEditableDuration: 0,
      partials: ['CHANNEL', 'MESSAGE', 'REACTION'],
    });

    client.once('ready', async () => {
      logger.info(`Logged in as ${client.user.tag} (${client.user.id})`);

      contextGenerator.initialize(client)
        .then(() => logger.info('Context generator initialized.'))
        .catch(logger.error);

      serviceHandler.initialize(client)
        .then((services) => logger.info(`${services.length} services initialized.`))
        .catch(logger.error);

      commandHandler.initialize(client)
        .then((commands) => logger.info(`${commands.length} commands initialized.`))
        .catch(logger.error);

      dataHandler.initialize(client)
        .then((guildStorages) => logger.info(`${guildStorages.length} guilds initialized.`))
        .catch(logger.error);
    });

    client.on('error', (err) => logger.error(err));

    setInterval(() => {
      client.user.setActivity(`${client.options.commandPrefix}help | watching over ${client.channels.cache.filter((channel) => channel.type === 'text').size} channels`);
    }, 60000);

    client.login(config.token);
  },
};
