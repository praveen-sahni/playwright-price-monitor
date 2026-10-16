async function sendTelegram(message) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: message }),
  });
  if (!res.ok) throw new Error(`Telegram error ${res.status}: ${await res.text()}`);
  return true;
}

async function sendDiscord(message) {
  const url = process.env.DISCORD_WEBHOOK_URL;
  if (!url) return false;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: message }),
  });
  if (!res.ok) throw new Error(`Discord error ${res.status}: ${await res.text()}`);
  return true;
}

async function notify(message) {
  const results = await Promise.allSettled([sendTelegram(message), sendDiscord(message)]);

  results.forEach((r) => {
    if (r.status === 'rejected') console.error('Notification failed:', r.reason.message);
  });

  const sent = results.some((r) => r.status === 'fulfilled' && r.value === true);
  if (!sent) console.warn('No notification was sent. Check your .env settings.');
  return sent;
}

module.exports = { notify };