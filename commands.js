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
    bot.user.setActivity("COVID-19 | -help");

    
    
})


bot.on("message", async msg=>  {
    if(msg.author.bot || msg.channel.type == "dm") return;

    let prefix = botconfig.prefix;
    let msgArray = msg.content.split(" ");
    let cmd = msgArray[0];
    
    //let args = msgArray.slice[0];
    // cmd


    if (cmd == `${prefix}help`) {
        Embed = new discord.MessageEmbed()

        .setAuthor("COVID Bot Commands: ", bot.user.displayAvatarURL())
        .setColor(colors.red)
        .addField("**-global**", "Displays Global COVID-19 stats.")
        .addField("**-countryinfo {country}**", "Use  to see country by country COVID info.")
        .addField("**-statesinfo {state}**", "Use to see state by state COVID info.")
        .addField("**-continentsinfo {continent}**", "Use to see COVID stats on different continents.")
        .addField("**-stats**", "Use to see amount of servers bot is in.")
        .addField("**-update**", "Use to see new features and fixes within the update.")
        .addField("**-resources**", "Use to see COVID-19 rescouces with multiple links.")
        .addField("**-invite**", "Use to get a invite link to get COVID Bot in your server.")
        .addField("**-info**", "Shows info about the bot such the data it uses and other info.")
        .addField("**Support us by upvoting the bot at:**", "https://top.gg/bot/708408478573789266")
        
        




        .setFooter("COVID-19 Bot | 1.5 | " + msg.createdAt)

        msg.channel.send({embed: Embed});

    }

    if (cmd == `${prefix}info`) {

        Embed = new discord.MessageEmbed()

        .setAuthor("COVID-19 Bot", bot.user.displayAvatarURL())
        .setTitle("Info: ")
        .setColor(colors.red)
        .addField("**Data:**", "Data is provided by https://corona.lmao.ninja/")
        .addField("**Live Data:**", "Data is updated live about once every 10 minutes.")
        .addField("**Support Server:**", "https://discord.gg/kvVr3qU")



        .setFooter("COVID-19 Bot | 1.5 | " + msg.createdAt)
        msg.channel.send({embed: Embed});

    }

    if (cmd == `${prefix}resources`) {
        Embed = new discord.MessageEmbed()
        .setAuthor("COVID Bot Commands: ", bot.user.displayAvatarURL())
        .setColor(colors.red)

        .setDescription("COVID-19 resources:")
        .addField("**CDC:** ", "https://www.cdc.gov/coronavirus/2019-ncov/index.html")
        .addField("**r/corornavirus: **", "https://www.reddit.com/r/Coronavirus/")
        .addField("**World Health Organization:**", "https://www.who.int/emergencies/diseases/novel-coronavirus-2019")


        .setFooter("COVID-19 Bot | 1.5 | " + msg.createdAt)
        msg.channel.send({embed: Embed});

    }


    if (cmd == `${prefix}update`) {

        Embed = new discord.MessageEmbed()

        .setAuthor("COVID Bot Commands: ", bot.user.displayAvatarURL())
        .setColor(colors.red)

        .addField("**New:**", "Added -info. Shows info about the bot. -help for more info.")
        .addField("**New**", "Completely Rewrote all stats. Much more info and stats for all colums.")
        .addField("**New:**", "Added -invite use -help to see.")
        .addField("**New:**", "Added continents to the pool of stats. -continentsinfo. use -help to see.")
       
        




        .setFooter("COVID-19 Bot | 1.5 | " + msg.createdAt)

        msg.channel.send({embed: Embed});

    }
    

    if(cmd === `${prefix}corona`) {

        const response = await fetch("https://thevirustracker.com/free-api?global=stats");
        const data = await response.json();
        
        



    }
    if(cmd === `${prefix}totalcases`) {
        const response = await fetch("https://thevirustracker.com/free-api?global=stats");
        const data = await response.json();
        var total = data.results[0];
        var total2 = total.total_cases;
        

        msg.channel.send("There are " + total2 + " cases in the world.");
    


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
            .setColor(colors.red)
            .setAuthor("Global COVID-19 Information", bot.user.displayAvatarURL())

            .setThumbnail(bot.user.displayAvatarURL())
            .addField("📈Total Cases:", numberWithCommas(totalCases), true)
            .addField("☠️Total Deaths:", numberWithCommas(deaths), true)
            .addField("💉Total Recovered: ", numberWithCommas(recovered), true)
            .addField("🗺️Total Countries:", numberWithCommas(totalCountries), true)
            .addField("☠️New Deaths Today: ", numberWithCommas(newDeaths), true)
            .addField("✉️New Cases Today: ", numberWithCommas(newCases), true)
            .addField("🧪Tests: ", numberWithCommas(test), true)
            .addField("🧪Tests Per One Million: ", numberWithCommas(testPerMillion), true)
            .addField("📊Active Per One Million", numberWithCommas(activePerMillion), true)



            .setFooter("COVID-19 Bot | 1.5 | " + msg.createdAt)




        msg.channel.send({embed: Embed});


        





    }




    if (cmd.includes(`${prefix}countryinfo`)) {

    
        var newStr = "";

        var arg2 = msg.content.slice(prefix.length).split(' ');
        
        var argRep = arg2[1].toLowerCase()
        
        if ("united" == argRep || "south" == argRep || "new" == argRep || "saudi" == argRep || "Sri" == argRep || "costa" == argRep || "san" == argRep)  {
            

            
            newStr = arg2[1]  + "%20" + arg2[2];

            

        } else {

            newStr = arg2[1];

        }
        
        
        
        var website2 = "https://corona.lmao.ninja/v2/countries/" + newStr;

        const response = await fetch(website2);
        const data = await response.json();

        var flagCountry = data.flag;
        
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
            .setColor(colors.red)
            .setAuthor("Error", bot.user.displayAvatarURL())

            .setThumbnail(bot.user.displayAvatarURL())
            .setDescription("That is not a valid country!")
           



            .setFooter("COVID-19 Bot | 1.5 | " + msg.createdAt)




            msg.channel.send({embed: Embed});
            return
            
        }



        Embed = new discord.MessageEmbed()
            .setColor(colors.red)
            .setAuthor( arg2[1] + " COVID-19 Information", bot.user.displayAvatarURL())

            .setThumbnail(bot.user.displayAvatarURL())
            .addField("📈Positive Cases:", numberWithCommas(confirmedCases), true)
            .addField("💀Confirmed Deaths:", numberWithCommas(confrimedDeaths), true)
            .addField("💉Confirmed Recoveries:", numberWithCommas(recoveries), true)
            .addField("💹Active Cases:", numberWithCommas(activeCountry), true)
            .addField("💀Critical:", numberWithCommas(criticalCountry), true)
            .addField("🧪Tests:", numberWithCommas(testsCountry), true)
            .addField("📈Cases Per Million:", numberWithCommas(casesMillion), true)
            .addField("🧪Tests Per Million:", numberWithCommas(testsMillion), true)
            .addField("💉Recoverd Per Million:", numberWithCommas(recoveredMillion), true)

           



            .setFooter("COVID-19 Bot | 1.5 | " + msg.createdAt)




        msg.channel.send({embed: Embed});



        

    }

    if(cmd == `${prefix}stats`) {



        msg.channel.send("COVIDBOT is in " + numberWithCommas(bot.guilds.cache.size) + " servers, serving " + numberWithCommas(bot.users.cache.size) + " users!");
        


    }

    if (cmd == `${prefix}statesinfo`) {

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
            .setColor(colors.red)
            .setAuthor("Error", bot.user.displayAvatarURL())

            .setThumbnail(bot.user.displayAvatarURL())
            .setDescription("That is not a valid state!")
           



            .setFooter("COVID-19 Bot | 1.5 | " + msg.createdAt)




            msg.channel.send({embed: Embed});
            return
            
        }

        Embed = new discord.MessageEmbed()
            .setColor(colors.red)
            .setAuthor( state + " COVID-19 Information", bot.user.displayAvatarURL())

            .setThumbnail(bot.user.displayAvatarURL())
            .addField("📈Positive Cases:", numberWithCommas(casesState), true)
            .addField("☠️Confirmed Deaths:", numberWithCommas(deahtsState), true)
            .addField("🧪Tests:", numberWithCommas(tests), true)
            .addField("💹Active:", numberWithCommas(activeCases), true)
            .addField("☠️Deaths Per Million:", numberWithCommas(deathsMillion), true)
            .addField("🧪Tests Per Million:", numberWithCommas(testsStateMillion), true)


    



            .setFooter("COVID-19 Bot | 1.5 | " + msg.createdAt)




        msg.channel.send({embed: Embed});

    }

    if (cmd == `${prefix}invite`) {

        Embed = new discord.MessageEmbed()
        
        .setAuthor("Invite COVID Bot to your server!", bot.user.displayAvatarURL())
        .setColor(colors.red)
        .addField("Use this link to invite COVID Bot:", invite)


        msg.author.send(Embed);

    }

    if(cmd == `${prefix}continentsinfo`) {

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
            .setColor(colors.red)
            .setAuthor("Error", bot.user.displayAvatarURL())

            .setThumbnail(bot.user.displayAvatarURL())
            .setDescription("That is not a valid continent!")
           



            .setFooter("COVID-19 Bot | 1.5 | " + msg.createdAt)




            msg.channel.send({embed: Embed});
            return
            
        }

        Embed = new discord.MessageEmbed()
            .setColor(colors.red)
            .setAuthor( continentName + " COVID-19 Information", bot.user.displayAvatarURL())

            .setThumbnail(bot.user.displayAvatarURL())
            .addField("📈Positive Cases:", numberWithCommas(continentCases), true)
            .addField("☠️Confirmed Deaths:", numberWithCommas(continentDeaths), true)
            .addField("🧪Tests:", numberWithCommas(continentTests), true)
            .addField("💹Active:", numberWithCommas(continentActive), true)
            .addField("📊New Cases:", numberWithCommas(continentNewCases), true)
            .addField("☠️New Deaths:", numberWithCommas(continentTodayDeaths), true)
            .addField("🏥Recovered:", numberWithCommas(continentRecovered), true)
            .addField("🧪Tests Per Million:", numberWithCommas(contientTestsMillion), true)
            .addField("☠️Deahts Per Million:", numberWithCommas(continentDeahtsMillion), true)
            
            
            


           



            .setFooter("COVID-19 Bot | 1.5 | " + msg.createdAt)




        msg.channel.send({embed: Embed});









    }

    






    
    
    



    
})




bot.login(process.env.token);
//bot.login(botconfig.token);