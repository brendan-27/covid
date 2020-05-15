const botconfig = require("./botconfig.json");
const discord = require("discord.js");
const bot = new discord.Client({disableEveryone : true});
const fetch = require("node-fetch");
const colors = require("./colors.json");

function textOutput (arg1, arg2) {
    var finalString = "";
    var res = arg1.substr(arg1.length - arg2[1].length + 1, arg1.length);


    finalString = finalString.concat(arg2[1][0].toUpperCase());
    finalString = finalString.concat(res.toLowerCase());


    return finalString;
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

        .addField("-global", "Displays Global COVID-19 stats.")
        .addField("-covidinfo {country}", "Use  to see country by country COVID info.")




        .setFooter("COVID-19 Bot | 1.0")

        msg.channel.send({embed: Embed});

    }
    

    if(cmd === `${prefix}corona`) {

        const response = await fetch("https://thevirustracker.com/free-api?global=stats");
        const data = await response.json();
        console.log(data);
        



    }
    if(cmd === `${prefix}totalcases`) {
        const response = await fetch("https://thevirustracker.com/free-api?global=stats");
        const data = await response.json();
        var total = data.results[0];
        var total2 = total.total_cases;
        

        msg.channel.send("There are " + total2 + " cases in the world.");
    


    }


    if (cmd === `${prefix}global`) {
        const response = await fetch("https://thevirustracker.com/free-api?global=stats");
        const data = await response.json();


        var totalCases = data.results[0];
        var totalCases2 = totalCases.total_cases;

        var deaths = data.results[0];
        var deaths2 = deaths.total_deaths;

        var newCases = data.results[0];
        var newCases2 = newCases.total_new_cases_today;

        var recovered = data.results[0];
        var recovered2 = recovered.total_recovered;

        var newDeaths = data.results[0];
        var newDeaths2 = newDeaths.total_new_deaths_today;
        
        


        Embed = new discord.MessageEmbed()
            .setColor(colors.red)
            .setAuthor("Global COVID-19 Information", bot.user.displayAvatarURL())

            .setThumbnail(bot.user.displayAvatarURL())
            .addField("Total Cases:", totalCases2, true)
            .addField("Total Deaths:", deaths2, true)
            .addField("Total Recovered: ", recovered2, true)
            .addField("New Cases Today:", newCases2, true)
            .addField("New Deaths Today: ", newDeaths2, true)



            .setFooter("COVID-19 Bot | 1.0")




        msg.channel.send({embed: Embed});


        





    }




    if (cmd.includes(`${prefix}covidinfo`)) {

    
        var arg = msg.content.slice(prefix.length).split(' ');
        
        
        var finalString = "";
        var res = msg.content.substr(msg.content.length - arg[1].length + 1, msg.content.length);

        
        finalString = finalString.concat(arg[1][0].toUpperCase());
        
        finalString = finalString.concat(res.toLowerCase());
        if (arg[1].toUpperCase() != "US" && arg[1].toLowerCase() != "united states" && arg[1].toLowerCase() != "america") {


            var website = "https://covid19-stats-api.herokuapp.com/api/v1/cases?country=" + textOutput(msg.content, arg);

        } else {
            website = "https://covid19-stats-api.herokuapp.com/api/v1/cases?country=US";
        }
        
        //console.log(finalString + " hello goobi");
        

        /*console.log(arg);
        console.log(website);*/
        
        

        const response = await fetch(website);
        const data = await response.json();
        
        var confirmedCases = data.confirmed;
        var confrimedDeaths = data.deaths;
        var recoveries = data.recovered;
        //var confirmedCases2 = confirmedCases.confirmed;
        

        if (confirmedCases == undefined) {
            Embed = new discord.MessageEmbed()
            .setColor(colors.red)
            .setAuthor("Error", bot.user.displayAvatarURL())

            .setThumbnail(bot.user.displayAvatarURL())
            .setDescription("That is not a valid country!")
           



            .setFooter("COVID-19 Bot | 1.0")




            msg.channel.send({embed: Embed});
            return
            
        }



        Embed = new discord.MessageEmbed()
            .setColor(colors.red)
            .setAuthor( arg[1] + " COVID-19 Information", bot.user.displayAvatarURL())

            .setThumbnail(bot.user.displayAvatarURL())
            .addField("Positive Cases:", confirmedCases, true)
            .addField("Confirmed Deaths:", confrimedDeaths, true)
            .addField("Confirmed Recoveries:", recoveries, true)

           



            .setFooter("COVID-19 Bot | 1.0")




        msg.channel.send({embed: Embed});



        

    }

    if(cmd == `${prefix}stats`) {

        var int = 0;

        for (var i = 0; i < bot.guilds; i++) {


            int++;

        }

        



        msg.channel.send("COVIDBOT is in " + int + " servers!");


    }






    
    
    



    
})




bot.login(process.env.token);