const { values } = require('faunadb')
var faunadb = require('faunadb')
q = faunadb.query

var client = new faunadb.Client({ secret: 'fnAE2Oc5SvACTMt3wWZ80CkLo4uu5-AZXW9sZSAw' })

async function createResource(data) {

    const categoryRef = data.categoryRef
    const resourceType = data.resourceType

    const title = data.title
    var createResource = await client.query(
        q.Create(
            q.Collection("Resource"),
            {
                data: {
                    title: title,
                    categoryRef: q.Ref(q.Collection(categoryRef.collection), categoryRef.id),
                }
            }
        )
    )
    resourceRef = createResource.ref

    function createWebsite(){
        const websiteUrl = data.websiteUrl
        const websiteName = data.websiteName

        var createWebsiteResource = client.query(
        q.Create(
            q.Collection("Website"),
            {
            data: {
                url: websiteUrl,
                name: websiteName,
                resourceRef: resourceRef,
            }
            }
        )
        )
    }

    function createVideo(){
        const videoUrl = data.videoUrl
        const videoDescription = data.videoDescription
        var createVideoRessurs = client.query(
        q.Create(
            q.Collection("Video"),
            {
            data: {
                url: videoUrl,
                description: videoDescription,
                resourceRef: resourceRef,
            }
            }
        )
        )

    }

    if(resourceType === "website"){
        createWebsite()
    } else if (resourceType === "video"){
        createVideo()
    } else {
        createWebsite()
        createVideo()
    }
}

async function createCategory(data){
    const name = data.name

    var createCategory = await client.query(
        q.Create(
            q.Collection("Category"),
            {
                data: {
                    name: name
                }
            }
        )
    )
}

async function getAllCategorys(){
    var getAllCategorys = await client.query(
        q.Paginate(
            q.Match(
                q.Index('all_category')
            )
        )
    )

    console.log(getAllCategorys)
}


module.exports.createResource = createResource
module.exports.createCategory = createCategory
module.exports.getAllCategorys = getAllCategorys