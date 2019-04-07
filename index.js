const config = require("./config.json");

const Discord = require("discord.js");
const chae = new Discord.Client();

chae.on("ready", () => {
    console.log(`${chae.user.username}가(이) 온라인 입니다. ${chae.users.size} 명의 유저와, ${chae.guilds.size} 개의 채널과 함께합니다!`)
});

chae.on("message", (message)=> {
    if (message.channel == "bot")return;
    if (message.author.bot) return;

    var msg = message.content.split(" ")
    var cmd = msg[0];
    let prefix = config.prefix;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (cmd === "c.help") {
        var InfoEnbed = new Discord.RichEmbed()
        .setColor('#1be525')
        .addField('help', '도움말을 확인합니다.', true)
        .addField('c.ping', '봇에 핑을 측정합니다.', true)
        .addField('c.bot', '봇에 정보를 브리핑합니다.', true)
        .addField('c.saver', '이 서버에 정보를 나열합니다.', true)
        .addField('c.익명 [할말]', '익명으로 대화를 합니다.', true)
        .addField('제작중!', '...', true)
        .addField('제작중!', '...', true)
        .addField('제작중!', '...', true)
        .setTimestamp()
        .setTimestamp()
        .setAuthor('도움말')
        .setFooter('현재시간');
        message.channel.send(InfoEnbed);
}

    if (cmd === `${prefix}ping`) {

        console.log(`ping 명령어를 사용 하셨습니다.`)

        startTime = Date.now();

        message.channel.send("핑 측정중").then((message) => {
            endTime = Date.now();

            let ping = Math.round(endTime - startTime)
            let rounded = ping / 1000
            
            message.edit("핑 측정중.")
            message.edit("핑 측정중..")
            message.edit("핑 측정중...")
            message.edit("핑 측정 완료")
            message.edit(`핑 | ${ping}ms.`)
            console.log(`Pinged by ${author}!`)
        })
}

    if (cmd === `${prefix}bot`) {
        var InfoEnbed = new Discord.RichEmbed()
        .setColor('#1be525')
        .setThumbnail('')
        .addField('봇 이름', chae.user.username)
        .addField("만든 날짜", chae.user.createdAt)
        .addField("채널", chae.guilds.size)
        .addField("인원", chae.user.size)
        message.channel.send(InfoEnbed);

        console.log(`${args} bot 정보를 나열했습니다`)
}

    if (cmd === `${prefix}saver`) {
        
        let sicon = message.guild.displayAvatarURL;
        let saverembed = new Discord.RichEmbed()
        .setDescription("saver Infomation")
        .setColor('#1be525')
        .addField("discord 서버 이름",  message.guild.name)
        .addField("생성 된 날짜", message.guild.createdAt)
        .addField("들어온 날짜", message.member.joinedAt)
        .addField("서버 인원", message.guild.memberCount)

        return message.channel.send(saverembed);
    }

    if (cmd === "c.익명") {
        if (!message.member.roles.some(r=>["익명"].includes(r.name)) )
        return message.reply("당신은 권한이 없습니다.");

        const sayMessage = args.join(" ");
        message.delete().catch(O_o=>{}); 

        console.log(`${args}라(이)고 익명 채팅을 치셨습니다.`)
    
        message.channel.send(sayMessage);
}
    if (cmd === "c.kick") {
        if (!message.member.roles.some(r=>["[ 관리자 ]"].includes(r.name)) )
        return message.reply("당신은 권한이 없습니다.");

        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member)
      return message.reply("서버에 있는사람중 이름을 적어주세요.");
    if (!member.kickable) 
      return message.reply("이 사용자를 kick 할 수 없습니다. 당신은 권한이 부족합니다!");

    let reason = args.slice(1).join(' ');
    if (!reason) reason = "사유가 없습니다.";
    
    member.kick(reason)
      .catch(error => message.reply(`${message.author} 때문에 ban 할 수 없습니다. : ${error}`));
    message.reply(`${member.user.tag} 가(이) ${message.author.tag} 의해 kick 되셨습니다.  사유: ${reason}`);
    console.log(`${member.user.tag}가(이) ${message.author.tag} 의해 kick 되셨습니다.`)
}

    if (cmd === "c.ban") {
        if (!message.member.roles.some(r=>["[ 관리자 ]"].includes(r.name)) )
        return message.reply("당신은 권한이 없습니다.");
    
        let member = message.mentions.members.first();
        if (!member)
        return message.reply("서버에 있는사람중 이름을 적어주세요.");
        if (!member.bannable) 
         return message.reply("이 사용자를 ban 할 수 없습니다. 당신은 권한이 부족합니다!");

        let reason = args.slice(1).join(' ');
        if (!reason) reason = "사유가 없습니다.";
    
        member.ban(reason)
        .catch(error => message.reply(`${message.author} 때문에 ban 할 수 없습니다. : ${error}`));
        message.reply(`${member.user.tag} 가(이) ${message.author.tag} 의해 ban 되셨습니다.    사유: ${reason}`);
        console.log(`${member.user.tag}가(이) ${message.author.tag} 의해 ban 되셨습니다.`)
}

    
    msg = ' ';
});

chae.login(config.Token);