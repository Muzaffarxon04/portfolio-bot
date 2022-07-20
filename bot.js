const TelegramBot = require("node-telegram-bot-api")
const config = require("./config/config")
const chat_id = 1061783391
const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000

const orders = []
let likescaunt = 0
let dislikescaunt = 0

let chat = [
    {
        text: "Assalomu Alaykum"
    },
    {
        text: "bu bot Muzaffarxon Abdusalomovning Portfolio boti botdan foydalanish uchun o'zingizga kerakli bo'limni tanlang."
    },
    {
        text: `https://t.me/portfolio55`
    }
]






const bot = new TelegramBot(config.BOT_TOKEN, {
    polling: true
})



bot.onText(/\/start/, msg => {

    const receiver = msg.chat.id

    bot.sendMessage(receiver, `Assalomu aleykum  ${msg.from.first_name},  ${chat[1].text}`, {
        reply_markup: {
            keyboard:
                [
                    [
                        {
                            text: '🧰 Portfolio'
                        },
                        {
                            text: '👥 Men haqimda'
                        },
                        {
                            text: '📞 Aloqa'
                        }
                    ],
                ],
            resize_keyboard: true
        }
    })
})
bot.sendChatAction(chat_id, "typing")


bot.on('message', msg => {

    const receiver = msg.chat.id
console.log(msg);
    if (msg.text === '📞 Aloqa') {
        bot.sendContact(receiver, +998995142358, 'Muzaffarxon', {
            last_name: 'Abdusalomov',
        })
    }

    else if (msg.text === '🧰 Portfolio') {
        bot.sendMessage(receiver, 'Qilgan proyektlarim', {
            reply_markup: {
                keyboard: [
                    [
                        {
                            text: 'Ob-Havo',
                        },
                        {
                            text: 'Tasbeh',
                        },
                        {
                            text: 'Twitter',
                        },
                        {
                            text: 'YouTube',
                        },
                    ],
                    [
                        {
                            text: 'Sirdaryoliklar24',
                        },
                        {
                            text: 'Films',
                        },
                        {
                            text: 'Portfolio kanalim',
                        }
                    ],
                    [
                        {
                            text: '⬅️  Orqaga',
                        },
                    ]
                ],
                resize_keyboard: true
            }

        })

    }

    else if (msg.text === '👥 Men haqimda') {
        bot.sendMessage(receiver, "👥 O'zim haqimda malumotlar", {
            reply_markup: {
                keyboard: [
                    [
                        {
                            text: '🤵 Men xamida malumotlar',
                        },
                        {
                            text: '📝 Rezumem bilan tanishish',
                        },
                    ],
                    [
                        {
                            text: '⬅️ Orqaga',
                        },
                    ]
                ],
                resize_keyboard: true
            }
        })
    }
   if (msg.text === "📝 Rezumem bilan tanishish") {

        bot.sendDocument(receiver, "./resume.pdf", {
            caption: "Muzaffazrxon Abdusalomov Resume",

            
        })
        
        bot.sendChatAction(chad.chat_id, "sendDocument")
    }

    else if (msg.text === "🤵 Men xamida malumotlar") {
        bot.sendMessage(receiver, `Mening ismim <b><a href="https://t.me/muzaffarxonabdusalomov">Muzaffarxon Abdusalomov</a> </b> Yoshim 17 da va men FullStack Dasturchiman, Men Dasturlashning Frontend hamda Backend kurslari bo'yicha <b><a href="https://najottalim.uz">Najot Ta'limda</a></b>  2021yilning aprel oyidan buyon o'qib kelmoqdaman va shu paytgacha ozmimi ko'pmi o'z <b><a href="https://t.me/portfolio55">portfoliomga</a></b> egaman`, {
            parse_mode:"HTML",
            disable_web_page_preview:true
            
    
        })
    }

else if (msg.text === "Twitter") {
     bot.copyMessage(receiver, -1001570704681, 70)

}
else if (msg.text === "Ob-Havo") {
    bot.copyMessage(receiver, -1001570704681, 37)

}

else if (msg.text === "Tasbeh") {
    bot.copyMessage(receiver, -1001570704681, 53)

}


else if (msg.text === "YouTube") {
    bot.copyMessage(receiver, -1001570704681, 69)

}

else if (msg.text === "Sirdaryoliklar24") {
    bot.copyMessage(receiver, -1001570704681, 35)

}
else if (msg.text === "Films") {
    bot.copyMessage(receiver, -1001570704681, 64)

}


else if (msg.text === "Portfolio kanalim") {
        bot.sendMessage(receiver, `${chat[2].text}`, {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: '❤️',
                            callback_data: '1ike'
                        },
                        {
                            text: '💔',
                            callback_data: 'dis1ike'
                        },
                    ]
                ],
                one_time_keyboard: true
            }
        })
    }


    if (msg.text = '⬅️  Orqaga') {

        bot.sendMessage(receiver, 'Asosiy menyu', {
            reply_markup: {

                keyboard:
                    [
                        [
                            {
                                text: '🧰 Portfolio'
                            },
                            {
                                text: '👥 Men haqimda'
                            },
                        ],
                        [
                            {
                                text: '📞 Aloqa'
                            }
                        ]
                    ],
                resize_keyboard: true
            }
        })
    }
})



bot.sendChatAction(chat_id, "typing")


bot.on('callback_query', (c) => {

    if (c.data === "1ike") {
        bot.answerCallbackQuery(c.id, {
            text: "Like uchun raxmat🙂",
        })
        ++likescaunt
    }
    
    else {
        bot.answerCallbackQuery(c.id, {
            text: "Xafa qildingiz☹️",
        })
        ++dislikescaunt
    }
    console.table(`Liklar soni ${likescaunt}, Like bosmaganlar soni ${dislikescaunt}`);

})





app.get('/botlists', (req, res) => {
    res.json(orders, likescaunt, dislikescaunt)
})

app.listen(PORT, () => console.log(PORT))


bot.getMe().then((d) => {
    if (d) {
        console.log(d);
    }
}).catch((e) => {
    console.log(e.message);
})




