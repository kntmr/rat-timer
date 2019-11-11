const functions = require('firebase-functions');
const {
  dialogflow,
  HtmlResponse
} = require('actions-on-google');

const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);

const app = dialogflow({
  debug: true
});

// TODO: Write your code here.

app.intent('Alert - yes', conv => {
  conv.ask('わかりました。タイマーをセットします。なんぷんにセットしますか？');
  conv.ask(new HtmlResponse({
    data: {
      scene: 'reset'
    }
  }));
});

app.intent('Alert', (conv, param) => {
  const ssml = `
    <speak>
      <p>はい、時間です！</p>
      <p>お疲れ様でした。</p>
      <break time="500ms" />
      <p>タイマーをリセットしますか？</p>
    </speak>`;
  conv.ask(ssml);
  // 画面を更新するための情報を持つHtmlResponseオブジェクト
  conv.ask(new HtmlResponse({
    data: {
      scene: 'alert'
    }
  }));
});

const pronoun = {
  three: '3分',
  five: '5分',
  ten: '10分',
  fifteen: '15分',
  thrity: '30分',
  sixty: '60分'
};

app.intent('Show', (conv, param) => {
  // ユーザーが選択した時間
  const userChoice = param['user-choice'].toLowerCase();
  // SSML
  const ssml = `
    <speak>
      <p>タイマー${pronoun[userChoice]}ですね。</p>
      <p>それではスタート！</p>
    </speak>`;
  conv.ask(ssml);
  // 画面を更新するための情報を持つHtmlResponseオブジェクト
  conv.ask(new HtmlResponse({
    data: {
      scene: 'countdown',
      userChoiceValue: pronoun[userChoice],
    }
  }));
});

app.intent('Default Welcome Intent', conv => {
  conv.ask('タイマーをセットします。なんぷんにセットしますか？');
  conv.ask(new HtmlResponse({
    url: `https://${firebaseConfig.projectId}.firebaseapp.com/`
  }));
});


app.intent('Default Fallback Intent', conv => {
  // do nothing
  conv.ask(new HtmlResponse({
    url: `https://${firebaseConfig.projectId}.firebaseapp.com/`
  }));
});

exports.fulfillment = functions.https.onRequest(app);
