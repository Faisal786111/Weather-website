const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()

// Define Paths for Express Config 
const publicDirectoryPath = path.join(__dirname , "../public")
const viewsPath = path.join(__dirname ,"../templates/views")
const partialsPath = path.join(__dirname ,"../templates/partials")

// Set HandleBars engine , Views Path and Handlebars Partials
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Set static directory to serve 
app.use(express.static(publicDirectoryPath))

// Template engine routes 
app.get("/", (req, res) =>{
    res.render("index" , {
        title : "Weather",
        name : "Faisal",
    });
});

app.get("/about", (req, res) =>{
    res.render("about",{
        title : "About",
        name : "Faisal",
    });
})

app.get("/help", (req, res)=> {
    res.render("help",{
        title:"Help",
        name:"Faisal",
        message:"This is an help page."
    })
})

app.get("/weather", (req , res) => {
    const address = req.query.address    

    if(!address){
        return res.send("You must provide the address.")
    }

    geocode(address , (error , {latitude , longtitude , location} = {}) =>{
        if(error){
            return res.send({error})
        }
        forecast(latitude , longtitude , (error , forecastData)=>{
                if(error){
                    return res.send({error})
                }
                res.send({
                    location , 
                    forecastData,
                    address
                })
        })
        
    })
})

// Query string 
app.get("/products", (req , res) => {
    console.log(req.query)
    console.log(req.query.search)
    const search = req.query.search

    if(!req.query.search){
        return res.send("You must provide the search!")
    }

    res.send({
        products : [{
            search
        },]
    })
})

// 404 Page not found Routing
app.get("/about/*" , (req , res) => {
    res.render("404page" , {
        title:"Page not found.",
        message:"About article not found.",
         name:"Faisal",
    })
})

app.get("/help/*" , (req , res) => {
    res.render("404page",{
        title:"Page not found.",
        message:"Help article not found.",
         name:"Faisal",
    })
})

app.get("/weather/*" , (req , res) => {
    res.render("404page",{
        title:"Page not found.",
        message:"Weather article not found.",
         name:"Faisal",
    })
})

app.get("*" , (req , res) => {
    res.render("404page" ,{
        title:"Page not found.",
        message:"The page you are looking is not found.",
         name:"Faisal",
    })
})

app.listen(3000 , () => {
    console.log("App is listening on port 3000")
})


