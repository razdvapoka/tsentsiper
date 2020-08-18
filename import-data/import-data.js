// CFPAT-MTVp85CrrFu0CCxK3EMV7-pmdktTD_SeH-QoLsFbYSc
//
//
var fs = require("fs")

var projects = require("./projects.json")

var R = require("ramda")

const sortedProjects = R.sortWith([
  R.descend(R.prop("year")),
  R.descend(R.prop("order")),
])(projects)

var contentful = require("contentful-management")
var client = contentful.createClient({
  accessToken: "CFPAT-MTVp85CrrFu0CCxK3EMV7-pmdktTD_SeH-QoLsFbYSc",
})

client.getSpace("s05y5945ugur").then(space => {
  return space.getEnvironment("master").then(env => {
    return env.getEntry("1CnbhXMVIiEEl05bcI0hgz").then(mainPage => {
      mainPage.fields.projects = {
        "en-US": sortedProjects.map(p => ({
          sys: {
            type: "Link",
            linkType: "Entry",
            id: p.entry.sys.id,
          },
        })),
      }
      return mainPage.update().then(() => {
        console.log("updated")
      })
    })
    /*
    return Promise.all(
      projects.map(p => {
        return env
          .createEntry("project", {
            fields: {
              title: {
                "en-US": p.Client_en,
                "ru-RU": p.Client_ru,
              },
              description: {
                "en-US": p.Project_en,
                "ru-RU": p.Project_ru,
              },
              category: {
                "en-US": p.Category_en,
                "ru-RU": p.Category_ru,
              },
              type: {
                "en-US": p.Type_en,
                "ru-RU": p.Type_ru,
              },
              year: {
                "en-US": p.Year,
              },
            },
          })
          .then(entry => {
            return {
              year: p.Year,
              order: p.Order,
              entry,
            }
          })
      })
    ).then(results => {
      var json = JSON.stringify(results)
      fs.writeFileSync("projects.json", json)
      console.log("finished")
    })
    */
  })
})
