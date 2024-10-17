€cmd install ai.js const axios = require('axios');

async function fetchFromAI(url, params) {
  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getAIResponse(input, userId, messageID) {
  const services = [
    { url: 'https://ai-tools.replit.app/gpt', params: { prompt: input, uid: userId } },
    { url: 'https://openaikey-x20f.onrender.com/api', params: { prompt: input } },
    { url: 'http://fi1.bot-hosting.net:6518/gpt', params: { query: input } },
    { url: 'https://ai-chat-gpt-4-lite.onrender.com/api/hercai', params: { question: input } }
  ];

  let response = "𝑆𝐴𝐿𝑈𝑇, 𝐽𝐸 𝑆𝑈𝐼𝑆 𝐿'𝐼𝑁𝑇𝐸𝐿𝐿𝐼𝐺𝐸𝑁𝐶𝐸 𝐴𝑅𝑇𝐼𝐹𝐼𝐶𝐼𝐸𝐿𝐿𝐸 𝐶𝑅É𝐸 𝑃𝐴𝑅 𝑀𝐸𝑆𝑆𝐼𝐸 𝑂𝑆𝐴𝑁𝐺𝑂 
𝑄𝑈𝐸 𝑃𝑈𝐼𝑆-𝐽𝐸 𝐹𝐴𝐼𝑅𝐸 𝑃𝑂𝑈𝑅 𝑉𝑂𝑈𝑆 ?
𝙋𝙊𝙎𝙀𝙕 𝙑𝙊𝙎 𝙌𝙐𝙀𝙎𝙏𝙄𝙊𝙉𝙎 𝙀𝙏 𝙅𝙀 𝙁𝙀𝙍𝘼𝙄 𝘿𝙀 𝙈𝙊𝙉 𝙈𝙄𝙀𝙐𝙓 𝙋𝙊𝙐𝙍 𝙔 𝙍𝙀𝙋𝙊𝙉𝘿𝙍𝙀 ! ";
  let currentIndex = 0;

  for (let i = 0; i < services.length; i++) {
    const service = services[currentIndex];
    const data = await fetchFromAI(service.url, service.params);
    if (data && (data.gpt4 || data.reply || data.response)) {
      response = data.gpt4 || data.reply || data.response;
      break;
    }
    currentIndex = (currentIndex + 1) % services.length; // Move to the next service in the cycle
  }

  return { response, messageID };
}

module.exports = {
  config: {
    name: 'ai',
    author: 'Arn',
    role: 0,
    category: 'ai',
    shortDescription: 'ai to ask anything',
  },
  onStart: async function ({ api, event, args }) {
    const input = args.join(' ').trim();
    if (!input) {
      api.sendMessage(`SATAN II\n━━━━━━━━━━━━━━━━\nPlease provide a question or statement.\n━━━━━━━━━━━━━━━━`, event.threadID, event.messageID);
      return;
    }

    const { response, messageID } = await getAIResponse(input, event.senderID, event.messageID);
    api.sendMessage(`DIEU OTOTSUKI \n━━━━━━━━━━━━━━━━\n${response}\n━━━━━━━━━━━━━━━━`, event.threadID, messageID);
  },
  onChat: async function ({ event, message }) {
    const messageContent = event.body.trim().toLowerCase();
    if (messageContent.startsWith("ai")) {
      const input = messageContent.replace(/^ai\s*/, "").trim();
      const { response, messageID } = await getAIResponse(input, event.senderID, message.messageID);
      message.reply(`☆𝙎𝘼𝙏𝑂𝑅𝑈 𝔤𝔬𝔧𝔬  𝐵𝑂𝑇\n━━━━━━━━━━━━━━━━\n${response}\n━━━━━━━━━━━━━━━━`, messageID);
    }
  }
};
