var faunadb = require('faunadb')

q = faunadb.query
var client = new faunadb.Client({ secret: 'fnAE2Oc5SvACTMt3wWZ80CkLo4uu5-AZXW9sZSAw'})

async function createCategory() {
  const name = "fish"
  const description = "eksample"

  var createCategory = await client.query(
    q.Create(
      q.Collection("Categori"),
      {
        data: {
          name: name,
        }
      }
    )
  )

  console.log(createCategory)
}


async function newRessurs() {
  const categoryref = categoryref
  const ressursType = ressursType

  const title = title
  var createRessurs =  client.query(
    q.Create(
      q.Collection("Kategori"),
      {
        data: {
            title: title,
        }
      }
    )
  )
  ressursRef = createRessurs.ref

  function createWebsite(){
    const websiteUrl = websiteUrl
    const websiteName = websiteName
    var createWebsiteRessurs = client.query(
      q.Create(
        q.Collection("Website"),
        {
          data: {
            url: websiteUrl,
            name: websiteName,
            ressursRef: ressursRef
          }
        }
      )
    )
  }

  function createVideo(){
    const videoUrl = videoUrl
    const videoDescription = videoDescription
    var createVideoRessurs = client.query(
      q.Create(
        q.Collection("Video"),
        {
          data: {
            url: videoUrl,
            description: videoDescription,
            ressursRef: ressursRef
          }
        }
      )
    )

  }

  if(description === "website"){
    createWebsite()
  } else if (description === "video"){
    createVideo()
  } else {
    createWebsite()
    createVideo()
  }
}   