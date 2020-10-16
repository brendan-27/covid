
const botconfig = require("./botconfig.json");
const discord = require("discord.js");
const bot = new discord.Client({disableEveryone : true});
const fetch = require("node-fetch");
const colors = require("./colors.json");
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwODQwODQ3ODU3Mzc4OTI2NiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTkwNTI0NDkyfQ.ajFs47xxzPA-N5y36CtaSoQBgxo41QcnX0-Fy7n3hWc', bot);


var invite = "https://discord.com/api/oauth2/authorize?client_id=708408478573789266&permissions=0&scope=bot";

dbl.on('posted', () => {
    console.log('Server count posted!');
  })
  
  dbl.on('error', e => {
   console.log(`Oops! ${e}`);
  })


function textOutput (arg1, arg2) {
    var finalString = "";
    var res = arg1.substr(arg1.length - arg2[1].length + 1, arg1.length);


    finalString = finalString.concat(arg2[1][0].toUpperCase());
    finalString = finalString.concat(res.toLowerCase());


    return finalString;
}

/*function sendMessage () {

    var guildList = bot.guilds;
    console.log(guildList.array);
    try {
        guildList.forEach(guild => guild.defaultChannel.send("messageToSend"));
    } catch (err) {
        console.log("Could not send message to ");
        console.log(err);
    }

}
sendMessage();*/

function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}



bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`)

    //bot.user.setActivity("Gaming | g!help");
    
})


let statuses = [`COVID-19`, `-help`, `Coronavirus`, `API's`, `DATA`]

setInterval(function() {


    let status = statuses[Math.floor(Math.random() * statuses.length)];

    bot.user.setActivity(status, {type: "WATCHING"});


}, 50000)

bot.on("message", async msg=>  {
    if(msg.author.bot || msg.channel.type == "dm") return;

    let prefix = botconfig.prefix;
    let msgArray = msg.content.split(" ");
    let cmd = msgArray[0];
    
    //let args = msgArray.slice[0];
    // cmd


    if (cmd == `${prefix}help`) {
        Embed = new discord.MessageEmbed()
        .setColor(colors.blue)


        .setAuthor("COVID Bot Help: ", bot.user.displayAvatarURL())
        .addField("**Commands for COVID Bot**:", "By state, by country, global, and by continent.", true)
        .addField("**-global**", "Displays Global COVID-19 stats.")
        .addField("**-countryinfo {state} or -country {country}**", "Use  to see country by country COVID info.")
        .addField("**Example:**", "-countryinfo US, -country sweden.", true)
        .addField("**-statesinfo {state} or -state {state}**", "Use to see state by state COVID info.")
        .addField("**Example:**", "-statesinfo New York, -state california.", true)
        .addField("**-continentsinfo {continent} or -continent {continent} **", "Use to see COVID stats on different continents.")
        .addField("**Example:**", "-continent asia, -continentinfo north america.", true)
        .addField("**-history {country}:**", "Use to see 6 day info on your selected country.")
        .addField("**Example:**", "-history america, -countryhistory sweden", true)
        .addField("**-province {province}:**", "Use to see 6 day info on provinces.")
        .addField("**Example:**", "-province Alberta, -provincehistory nova scotia", true)
        .addField("**-worldhistory:**", "Shows info from the previous 6 days so you can track growth.", )
        .addField("**-stats**", "Use to see amount of servers bot is in.")
        .addField("**-changelog**", "Use to see new features and fixes within the update.")
        .addField("**-resources**", "Use to see COVID-19 rescouces with multiple links.")
        .addField("**-invite**", "Use to get a invite link to get COVID Bot in your server.")
        .addField("**-API:**", "Shows information about the API COVID-19 Bot runs off.")
        .addField("**-ping**", "Shows the ping of the bot. (Response Time).")
        .addField("**Info about the bot:**", "Data, support server and other general info about the bot.", true)
        .addField("**Maintenance and Errors:**", "History Commands were not responsive. Sorry for the incovenience.")
        .addField("**Live Data:**", "Data is updated live about once every 10 minutes. 99% percent of the time the data is accurate, but sometimes the API messes up so do not be shocked if you see weird numbers.")
        .addField("**Data:**", "Data is provided by https://corona.lmao.ninja/")
        .addField("**Support Server:**", "https://discord.gg/kvVr3qU")
        .addField("**Support us by upvoting the bot at:**", "https://top.gg/bot/708408478573789266")
        .addField("**Invite COVID Bot to your server:**", "Click [Here](https://discord.com/api/oauth2/authorize?client_id=708408478573789266&permissions=0&scope=bot), or use -invite.")

        

            .setTimestamp()
        .setFooter("COVID-19 Bot | 1.8 | ")

        msg.channel.send({embed: Embed});

    }

    if(cmd == `${prefix}api` || cmd == `${prefix}API`){
        Embed = new discord.MessageEmbed()
        .setColor(colors.blue)
        .setAuthor("COVID Bot Help: ", bot.user.displayAvatarURL())

        .addField("**API:**", "API used to make COVID-19 Bot is corona corona.lmao.ninja.")
        .addField("**Updates:**", "Data is live and is updated once every 10 minutes for every command.")
        .addField("**Innacurate Data:**", "Sometimes API will have internal errors and this causes some feilds to be marked as 0. But This doest happen too much. This is the only known issue.")
        .addField("**Known Issues:**", "When using -history {country} some of the fields may show 0. This is a API error and should be fixed within 24 hours.")




            .setTimestamp()
        .setFooter("COVID-19 Bot | 1.8 | ")

        msg.channel.send({embed: Embed});


    }

    /*if (cmd == `${prefix}info`) {

        Embed = new discord.MessageEmbed()

        .setAuthor("COVID-19 Bot", bot.user.displayAvatarURL())
        .setTitle("Info: ")
        .setColor(colors.blue)
        .addField("**Data:**", "Data is provided by https://corona.lmao.ninja/")
        .addField("**Live Data:**", "Data is updated live about once every 10 minutes.")
        .addField("**Support Server:**", "https://discord.gg/kvVr3qU")



        .setFooter("COVID-19 Bot | 1.7 | " + msg.createdAt)
        msg.channel.send({embed: Embed});

    }*/

    if (cmd == `${prefix}resources`) {
        Embed = new discord.MessageEmbed()
        .setAuthor("COVID Bot ", bot.user.displayAvatarURL())
        .setColor(colors.blue)

        .setDescription("COVID-19 resources:")
        .addField("**CDC:** ", "https://www.cdc.gov/coronavirus/2019-ncov/index.html")
        .addField("**r/corornavirus: **", "https://www.reddit.com/r/Coronavirus/")
        .addField("**World Health Organization:**", "https://www.who.int/emergencies/diseases/novel-coronavirus-2019")

            .setTimestamp()
        .setFooter("COVID-19 Bot | 1.8 | ")
        msg.channel.send({embed: Embed});

    }


    if (cmd == `${prefix}changelog`) {

        Embed = new discord.MessageEmbed()

        .setAuthor("COVID Bot Commands: ", bot.user.displayAvatarURL())
        .setColor(colors.blue)

        .addField("**New:**", "Added -API see -help for more info.")
        .addField("**New:**", "Added -worldhistory to see world COVID-19 stats for previous 6 days.")
        .addField("**New:**", "Added -history {country}")
        .addField("**New:**", "Added Province 6 day history.")
        .addField("**Fixes:**", "Removed 2 non-working commands.")
       
        



            .setTimestamp()
        .setFooter("COVID-19 Bot | 1.8 | ")

        msg.channel.send({embed: Embed});

    }
    
    


    if (cmd === `${prefix}global`) {
        const response = await fetch("https://corona.lmao.ninja/v2/all");
        const data = await response.json();


        var totalCases = data.cases;
        var deaths = data.deaths
        var newCases = data.todayCases;
        var recovered = data.recovered
        var newDeaths = data.todayDeaths;
        var totalCountries = data.affectedCountries;
        var test = data.tests;
        var testPerMillion = data.testsPerOneMillion;
        var activePerMillion = data.activePerOneMillion;


        Embed = new discord.MessageEmbed()
            .setColor(colors.blue)
            .setAuthor("Global COVID-19 Information", bot.user.displayAvatarURL())

            .setThumbnail(bot.user.displayAvatarURL())
            .addField("📈 Total Cases:", numberWithCommas(totalCases) + "(+" + numberWithCommas(newCases) + " today)", true)
            .addField("☠️ Total Deaths:", numberWithCommas(deaths) + "(+" + numberWithCommas(newDeaths) + " today)", true)
            .addField("💉 Total Recovered: ", numberWithCommas(recovered), true)
            .addField("🗺️ Total Countries:", numberWithCommas(totalCountries), true)
            .addField("☠️ New Deaths Today: ", numberWithCommas(newDeaths), true)
            .addField("✉️ New Cases Today: ", numberWithCommas(newCases), true)
            .addField("🧪 Tests: ", numberWithCommas(test), true)
            .addField("🧪 Tests Per One Million: ", numberWithCommas(testPerMillion), true)
            .addField("📊 Active Per One Million", numberWithCommas(activePerMillion), true)
            


            .setTimestamp()
            .setFooter("COVID-19 Bot | 1.8 | ")




        msg.channel.send({embed: Embed});


    }




    if (cmd == `${prefix}countryinfo` || cmd == `${prefix}country`) {

    
        var newStr = "";

        var arg2 = msg.content.slice(prefix.length).split(' ');
        
        var argRep = arg2[1].toLowerCase()
        
        if ("united" == argRep || "south" == argRep || "new" == argRep || "saudi" == argRep || "sri" == argRep || "costa" == argRep || "san" == argRep)  {
            

            
            newStr = arg2[1]  + "%20" + arg2[2];

            

        } else {

            newStr = arg2[1];

        }
        
        
        
        var website2 = "https://corona.lmao.ninja/v2/countries/" + newStr;

        const response = await fetch(website2);
        const data = await response.json();

        var flagCountry = data.flag;


        console.log(data);
        
        var confirmedCases = data.cases;
        var confrimedDeaths = data.deaths;
        var recoveries = data.recovered;

        var activeCountry = data.active;
        var criticalCountry = data.critical
        var testsCountry = data.tests;

        var casesMillion = data.casesPerOneMillion;
        var testsMillion = data.testsPerOneMillion;
        var recoveredMillion = data.recoveredPerOneMillion;
        
        

        if (confirmedCases == undefined) {
            Embed = new discord.MessageEmbed()
            .setColor(colors.blue)
            .setAuthor("Error", bot.user.displayAvatarURL())

            .setThumbnail(bot.user.displayAvatarURL())
            .setDescription("That is not a valid country!")
           


                .setTimestamp()
            .setFooter("COVID-19 Bot | 1.8 | ")




            msg.channel.send({embed: Embed});
            return
            
        }



        Embed = new discord.MessageEmbed()
            .setColor(colors.blue)
            .setAuthor(arg2[1] + " COVID-19 Information", bot.user.displayAvatarURL())

            .setThumbnail(bot.user.displayAvatarURL())
            .addField("📈 Positive Cases:", numberWithCommas(confirmedCases), true)
            .addField("💀 Confirmed Deaths:", numberWithCommas(confrimedDeaths), true)
            .addField("💉 Confirmed Recoveries:", numberWithCommas(recoveries), true)
            .addField("💹 Active Cases:", numberWithCommas(activeCountry), true)
            .addField("💀 Critical:", numberWithCommas(criticalCountry), true)
            .addField("🧪 Tests:", numberWithCommas(testsCountry), true)
            .addField("📈 Cases Per Million:", numberWithCommas(casesMillion), true)
            .addField("🧪 Tests Per Million:", numberWithCommas(testsMillion), true)
            .addField("💉 Recoverd Per Million:", numberWithCommas(recoveredMillion), true)

           


            .setTimestamp()
            .setFooter("COVID-19 Bot | 1.8 | " )




        msg.channel.send({embed: Embed});



        

    }

    if(cmd == `${prefix}stats`) {

        Embed = new discord.MessageEmbed()
        //msg.channel.send("COVIDBOT is in " + numberWithCommas(bot.guilds.cache.size) + " servers, serving " + numberWithCommas(bot.users.cache.size) + " users!");
        .setColor(colors.blue)
        .setAuthor("COVID-19 Bot Stats", bot.user.displayAvatarURL())
        //.setDescription("```COVIDBOT is in " + numberWithCommas(bot.guilds.cache.size) + " servers, serving " + numberWithCommas(bot.users.cache.size) + " users!```")
        .addField("Total Servers: ", numberWithCommas(bot.guilds.cache.size))
        .addField("Total Members: ", numberWithCommas(bot.users.cache.size))
            .setTimestamp()
        .setFooter("COVID-19 Bot | 1.8 |")
        msg.channel.send({embed: Embed});
    }
    

    if (cmd == `${prefix}statesinfo` || cmd == `${prefix}stateinfo` || cmd == `${prefix}state`) {

        var newStr = "";

        var arg2 = msg.content.slice(prefix.length).split(' ');
        
        var argRep = arg2[1].toLowerCase()
        
        if ("new" == argRep || "south" == argRep || "north" == argRep || "west" == argRep)  {
            

            
            newStr = arg2[1]  + "%20" + arg2[2];

            

        } else {

            newStr = arg2[1];

        }
        
        
        
        var website2 = "https://corona.lmao.ninja/v2/states/" + newStr;
        const response = await fetch(website2);
        const data2 = await response.json();

        var casesState = data2.cases;
        var deahtsState = data2.deaths;
        var tests = data2.tests;
        var activeCases = data2.active;
        var state = data2.state;
        var deathsMillion = data2.deathsPerOneMillion;
        var testsStateMillion = data2.testsPerOneMillion;

        if (casesState == undefined) {
            Embed = new discord.MessageEmbed()
            .setColor(colors.blue)
            .setAuthor("Error", bot.user.displayAvatarURL())

            .setThumbnail(bot.user.displayAvatarURL())
            .setDescription("That is not a valid state!")
           


                .setTimestamp()
            .setFooter("COVID-19 Bot | 1.8 | ")




            msg.channel.send({embed: Embed});
            return
            
        }

        Embed = new discord.MessageEmbed()
            .setColor(colors.blue)
            .setAuthor(state + " COVID-19 Information", bot.user.displayAvatarURL())

            .setThumbnail(bot.user.displayAvatarURL())
            .addField("📈Positive Cases:", numberWithCommas(casesState), true)
            .addField("☠️Confirmed Deaths:", numberWithCommas(deahtsState), true)
            .addField("🧪Tests:", numberWithCommas(tests), true)
            .addField("💹Active:", numberWithCommas(activeCases), true)
            .addField("☠️Deaths Per Million:", numberWithCommas(deathsMillion), true)
            .addField("🧪Tests Per Million:", numberWithCommas(testsStateMillion), true)


    


            .setTimestamp()
            .setFooter("COVID-19 Bot | 1.8 | ")




        msg.channel.send({embed: Embed});

    }

    if (cmd == `${prefix}invite`) {

        Embed = new discord.MessageEmbed()
        
        .setAuthor("Invite COVID Bot to your server!", bot.user.displayAvatarURL())
        .setColor(colors.blue)
        .addField("Use this link to invite COVID Bot:", invite)
            .setTimestamp()
        .setFooter("COVID-19 Bot | 1.8 | " )


        msg.author.send(Embed);

    }

    if(cmd == `${prefix}continentsinfo` || cmd == `${prefix}continentinfo` || cmd == `${prefix}continent`) {

        var newStr = "";

        var arg2 = msg.content.slice(prefix.length).split(' ');
        
        var argRep = arg2[1].toLowerCase()
        
        if ("south" == argRep || "north" == argRep)  {
            

            
            newStr = arg2[1]  + "%20" + arg2[2];

            

        } else {

            newStr = arg2[1];

        }
        
        
        
        var website2 = "https://corona.lmao.ninja/v2/continents/" + newStr;
        const response = await fetch(website2);
        const data = await response.json();

        var continentName = data.continent;

        var continentCases = data.cases;
        var continentNewCases = data.todayCases;
        var continentDeaths = data.deaths;


        var continentTodayDeaths = data.todayDeaths;
        var continentRecovered = data.recovered;
        var continentActive = data.active;

        var continentTests = data.tests;
        var contientTestsMillion = data.testsPerOneMillion;
        var continentDeahtsMillion = data.deathsPerOneMillion;



        if (continentCases == undefined) {
            Embed = new discord.MessageEmbed()
            .setColor(colors.blue)
            .setAuthor("Error", bot.user.displayAvatarURL())

            .setThumbnail(bot.user.displayAvatarURL())
            .setDescription("That is not a valid continent!")
           


                .setTimestamp()
            .setFooter("COVID-19 Bot | 1.8 | " )




            msg.channel.send({embed: Embed});
            return
            
        }

        Embed = new discord.MessageEmbed()
            .setColor(colors.blue)
            .setAuthor(continentName +  " COVID-19 Information", bot.user.displayAvatarURL())

            .setThumbnail(bot.user.displayAvatarURL())
            .addField("📈 Positive Cases:", numberWithCommas(continentCases) + "(+" + numberWithCommas(continentNewCases) + " today)", true)
            .addField("☠️ Confirmed Deaths:", numberWithCommas(continentDeaths) + "(+" + numberWithCommas(continentTodayDeaths) + " today)", true)
            .addField("🧪 Tests:", numberWithCommas(continentTests), true)
            .addField("💹 Active:", numberWithCommas(continentActive), true)
            .addField("📊 New Cases:", numberWithCommas(continentNewCases), true)
            .addField("☠️ New Deaths:", numberWithCommas(continentTodayDeaths), true)
            .addField("🏥 Recovered:", numberWithCommas(continentRecovered), true)
            .addField("🧪 Tests Per Million:", numberWithCommas(contientTestsMillion), true)
            .addField("☠️ Deahts Per Million:", numberWithCommas(continentDeahtsMillion), true)
        

            .setTimestamp()
            .setFooter("COVID-19 Bot | 1.8 | ")




        msg.channel.send({embed: Embed});




    }

    if (cmd == `${prefix}ping`) {
        
        msg.channel.send("Connecting To Server...").then(m => {
            var ping = m.createdTimestamp - msg.createdTimestamp;
            var botPing = Math.round(bot.ping);


            m.edit(`Bot Ping: ${ping}`)
        })





    }

    if (cmd == `${prefix}historyall` || cmd == `${prefix}worldhistory`) {

        /*const response = await fetch("https://disease.sh/v2/historical/all?lastdays=5");
        const data = await response.json();*/

        const data = await fetch(`https://disease.sh/v2/historical/all?lastdays=6`).then(res => res.json());
       
        //cases
        var cases = data['cases'];
        cases = Object.values(cases);
        //console.log(cases);
        //deaths

        var deaths = data['deaths'];
        deaths = Object.values(deaths);
        //console.log(deaths);

        //recovs
        var recovs = data['recovered'];
        recovs = Object.values(recovs);
        //console.log(recovs);


        Embed = new discord.MessageEmbed()
        .setColor(colors.blue)
        .setAuthor("Global Historic COVID-19 Information", bot.user.displayAvatarURL())
        .setThumbnail(bot.user.displayAvatarURL())

        .addField("**6 days ago:** ", "📈 Total Cases: " + numberWithCommas(cases[0]) + "\n☠️ Total Deaths: " + numberWithCommas(deaths[0]) + "\n💉 Total Recovs: " + numberWithCommas(recovs[0]))
        .addField("**5 days ago:** ", "📈 Total Cases: " + numberWithCommas(cases[1]) + "\n☠️ Total Deaths: " + numberWithCommas(deaths[1]) + "\n💉 Total Recovs: " + numberWithCommas(recovs[1]))
        .addField("**4 days ago:** ", "📈 Total Cases: " + numberWithCommas(cases[2]) + "\n☠️ Total Deaths: " + numberWithCommas(deaths[2]) + "\n💉 Total Recovs: " + numberWithCommas(recovs[2]))

        .addField("**3 days ago:** ", "📈 Total Cases: " + numberWithCommas(cases[3]) + "\n☠️ Total Deaths: " + numberWithCommas(deaths[3]) + "\n💉 Total Recovs: " + numberWithCommas(recovs[3]))
        .addField("**2 days ago:** ", "📈 Total Cases: " + numberWithCommas(cases[4]) + "\n☠️ Total Deaths: " + numberWithCommas(deaths[4]) + "\n💉 Total Recovs: " + numberWithCommas(recovs[4]))
        .addField("**1 day ago:** ", "📈 Total Cases: " + numberWithCommas(cases[5]) + "\n☠️ Total Deaths: " + numberWithCommas(deaths[5]) + "\n💉 Total Recovs: " + numberWithCommas(recovs[5]))
            .setTimestamp()
        .setFooter("COVID-19 Bot | 1.8 | ")
        msg.channel.send({embed: Embed});

    }



    if (cmd == `${prefix}history` || cmd == `${prefix}countryhistory`) {

        var newStr = "";

        var arg2 = msg.content.slice(prefix.length).split(' ');
        
        var argRep = arg2[1].toLowerCase()
        
        if ("united" == argRep || "south" == argRep || "new" == argRep || "saudi" == argRep || "sri" == argRep || "costa" == argRep || "san" == argRep)  {
            

            
            newStr = arg2[1]  + "%20" + arg2[2];

            

        } else {

            newStr = arg2[1];

        }
        const data = await fetch(`https://disease.sh/v2/historical/` + newStr + `?lastdays=6`).then(res => res.json());
        //cases
        var casesC = data['timeline'];
        if (casesC == undefined) {

            Embed = new discord.MessageEmbed()
            .setColor(colors.blue)
            .setAuthor("Error", bot.user.displayAvatarURL())

            .setThumbnail(bot.user.displayAvatarURL())
            .setDescription("That is not a valid country!")
           


                .setTimestamp()
            .setFooter("COVID-19 Bot | 1.8 | ")




            msg.channel.send({embed: Embed});
            return

        }
        casesC = casesC.cases;
        
        casesC = Object.values(casesC);
        // use cases[1] to see data

        //deaths
        var deathsC = data['timeline'];
        deathsC = deathsC.deaths;
        deathsC = Object.values(deathsC);

        //recovs
        var recovs = data['timeline'];
        recovs = recovs.recovered;
        recovs = Object.values(recovs);

        //start embed for error
        var countryName = data['country'];
        

        

        //start embed




            Embed = new discord.MessageEmbed()
            .setColor(colors.blue)
            .setAuthor(provinceName + " Historic COVID-19 Information", bot.user.displayAvatarURL())
            .setThumbnail(bot.user.displayAvatarURL())


            .addField("**6 days ago:** ", "📈 Total Cases: " + numberWithCommas(casesP[0]) + "\n☠️ Total Deaths: " + numberWithCommas(deathsP[0]) + "\n💉 Total Recovs: " + numberWithCommas(recovs[0]))
            .addField("**5 days ago:** ", "📈 Total Cases: " + numberWithCommas(casesP[1]) + "\n☠️ Total Deaths: " + numberWithCommas(deathsP[1]) + "\n💉 Total Recovs: " + numberWithCommas(recovs[1]))
            .addField("**4 days ago:** ", "📈 Total Cases: " + numberWithCommas(casesP[2]) + "\n☠️ Total Deaths: " + numberWithCommas(deathsP[2]) + "\n💉 Total Recovs: " + numberWithCommas(recovs[2]))

            .addField("**3 days ago:** ", "📈 Total Cases: " + numberWithCommas(casesP[3]) + "\n☠️ Total Deaths: " + numberWithCommas(deathsP[3]) + "\n💉 Total Recovs: " + numberWithCommas(recovs[3]))
            .addField("**2 days ago:** ", "📈 Total Cases: " + numberWithCommas(casesP[4]) + "\n☠️ Total Deaths: " + numberWithCommas(deathsP[4]) + "\n💉 Total Recovs: " + numberWithCommas(recovs[4]))
            .addField("**1 day ago:** ", "📈 Total Cases: " + numberWithCommas(casesP[5]) + "\n☠️ Total Deaths: " + numberWithCommas(deathsP[5]) + "\n💉 Total Recovs: " + numberWithCommas(recovs[5]))


                .setTimestamp()
            .setFooter("COVID-19 Bot | 1.8 | ")
            msg.channel.send({embed: Embed});
    
    }



    if(cmd == `${prefix}provincehistory` || cmd == `${prefix}province`) {

        var newStr = "";

        var arg2 = msg.content.slice(prefix.length).split(' ');
        
        var argRep = arg2[1].toLowerCase()
        
        if ("nova" == argRep || "south" == argRep || "new" == argRep || "saudi" == argRep || "sri" == argRep || "costa" == argRep || "san" == argRep)  {
            

            
            newStr = arg2[1]  + "%20" + arg2[2];

            

        } else {

            newStr = arg2[1];

        }
        const data = await fetch(`https://disease.sh/v2/historical/canada/` + newStr + `?lastdays=6`).then(res => res.json());
        //cases
        var casesP = data['timeline'];
        if (casesP == undefined) {

            Embed = new discord.MessageEmbed()
            .setColor(colors.blue)
            .setAuthor("Error", bot.user.displayAvatarURL())

            .setThumbnail(bot.user.displayAvatarURL())
            .setDescription("That is not a valid province!")
           


                .setTimestamp()
            .setFooter("COVID-19 Bot | 1.8 | ")




            msg.channel.send({embed: Embed});
            return
        }
        casesP = casesP.cases;
        
        casesP = Object.values(casesP);

        



        //deaths
        var deathsP = data['timeline'];
        deathsP = deathsP.deaths;
        deathsP = Object.values(deathsP);
        //recovs
        var recovs = data['timeline'];
        recovs = recovs.recovered;
        recovs = Object.values(recovs);
        var provinceName = data['province'];
        if (recovs[0], recovs[1], recovs[2], recovs[3], recovs[4], recovs[5] == 0) {

            Embed = new discord.MessageEmbed()
            .setColor(colors.blue)
            .setAuthor(provinceName + " Historic COVID-19 Information", bot.user.displayAvatarURL())
            .setThumbnail(bot.user.displayAvatarURL())


            .addField("**6 days ago:** ", "📈 Total Cases: " + numberWithCommas(casesP[0]) + "\n☠️ Total Deaths: " + numberWithCommas(deathsP[0]))
            .addField("**5 days ago:** ", "📈 Total Cases: " + numberWithCommas(casesP[1]) + "\n☠️ Total Deaths: " + numberWithCommas(deathsP[1]))
            .addField("**4 days ago:** ", "📈 Total Cases: " + numberWithCommas(casesP[2]) + "\n☠️ Total Deaths: " + numberWithCommas(deathsP[2]))

            .addField("**3 days ago:** ", "📈 Total Cases: " + numberWithCommas(casesP[3]) + "\n☠️ Total Deaths: " + numberWithCommas(deathsP[3]))
            .addField("**2 days ago:** ", "📈 Total Cases: " + numberWithCommas(casesP[4]) + "\n☠️ Total Deaths: " + numberWithCommas(deathsP[4]))
            .addField("**1 day ago:** ", "📈 Total Cases: " + numberWithCommas(casesP[5]) + "\n☠️ Total Deaths: " + numberWithCommas(deathsP[5]))


                .setTimestamp()
            .setFooter("COVID-19 Bot | 1.8 | ")
            msg.channel.send({embed: Embed});


        } else {


            Embed = new discord.MessageEmbed()
            .setColor(colors.blue)
            .setAuthor(provinceName + " Historic COVID-19 Information", bot.user.displayAvatarURL())
            .setThumbnail(bot.user.displayAvatarURL())


            .addField("**6 days ago:** ", "📈 Total Cases: " + numberWithCommas(casesP[0]) + "\n☠️ Total Deaths: " + numberWithCommas(deathsP[0]) + "\n💉 Total Recovs: " + numberWithCommas(recovs[0]))
            .addField("**5 days ago:** ", "📈 Total Cases: " + numberWithCommas(casesP[1]) + "\n☠️ Total Deaths: " + numberWithCommas(deathsP[1]) + "\n💉 Total Recovs: " + numberWithCommas(recovs[1]))
            .addField("**4 days ago:** ", "📈 Total Cases: " + numberWithCommas(casesP[2]) + "\n☠️ Total Deaths: " + numberWithCommas(deathsP[2]) + "\n💉 Total Recovs: " + numberWithCommas(recovs[2]))

            .addField("**3 days ago:** ", "📈 Total Cases: " + numberWithCommas(casesP[3]) + "\n☠️ Total Deaths: " + numberWithCommas(deathsP[3]) + "\n💉 Total Recovs: " + numberWithCommas(recovs[3]))
            .addField("**2 days ago:** ", "📈 Total Cases: " + numberWithCommas(casesP[4]) + "\n☠️ Total Deaths: " + numberWithCommas(deathsP[4]) + "\n💉 Total Recovs: " + numberWithCommas(recovs[4]))
            .addField("**1 day ago:** ", "📈 Total Cases: " + numberWithCommas(casesP[5]) + "\n☠️ Total Deaths: " + numberWithCommas(deathsP[5]) + "\n💉 Total Recovs: " + numberWithCommas(recovs[5]))


                .setTimestamp()
            .setFooter("COVID-19 Bot | 1.8 | " )
            msg.channel.send({embed: Embed});
        }

      
        
    
    }


})




bot.login(process.env.token);
// outdated: bot.login(botconfig.token);