const express = require('express');
const bodyParser = require('body-parser');
const mailer = require('./nodemailer');
const json2html = require('node-json2html');

const app = express();
const PORT = 3001;


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/order', (req, res) => {
    if(!req.body.contacts.name || !req.body.contacts.surname || !req.body.contacts.email || !req.body.contacts.tel) { return res.sendStatus(400) }    
    res.send('Заявка создана!')
    const pars = (obj) => {
        // Патерн
        let template = {"<>":"tr","html":[
			{"<>":"td","style":"border:1px solid #615f5f","html":"#"},
			{"<>":"td","style":"border:1px solid #615f5f","html":"${id}"},
			{"<>":"td","style":"border:1px solid #615f5f","html":"${title}"},
			{"<>":"td","style":"border:1px solid #615f5f","html":"${price}"},
			{"<>":"td","style":"border:1px solid #615f5f","html":"${quantity}"}
		]};
        return `
        <div style="max-width:600px;margin:0 auto; font-family:Arial">
            <div style="font-size:16px">
                <div>Имя: <span>${obj.contacts.name}</span></div>
                <div>Фамилия: <span>${obj.contacts.surname}</span></div>
                <div>Почта: <span>${obj.contacts.email}</span></div>
                <div>Телефон: <span>${obj.contacts.tel}</span></div>
            </div>
            <br>
            <table border="0" width="100%" cellpadding="3" style="border:1px solid #615f5f; font-size:14px; border-collapse:collapse">
                <tbody>
                    <tr>
                        <th style="border:1px solid #615f5f">#</th>
                        <th style="border:1px solid #615f5f">ID</th>
                        <th style="border:1px solid #615f5f">Название</th>
                        <th style="border:1px solid #615f5f">Цена</th>
                        <th style="border:1px solid #615f5f">Кол-во</th>
                    </tr>
                    ${json2html.render(obj.purchase, template)}
                </tbody>
            </table>
            <br>
            <div style="text-align: end; font-size: 18px;">Сумма к оплате: <span><b>${obj.amount} </b></span>тг.</div> 
	    </div>
        `
    }
    const mailOptions = {
        from: 'elena.karpova.mailing@gmail.com',
        to: 'lnkrpvaa@gmail.com',
        subject: 'Супер новое письмо',
        html: pars(req.body)
    }
    mailer(mailOptions)
    
});
app.use(express.static(__dirname));
app.get('/order', (req, res) => {
    res.sendFile(__dirname + '/index.html');   
})
app.listen(PORT, () => console.log(`server listening at http://localhost:${PORT}/order`))


