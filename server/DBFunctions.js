const { values, Foreach } = require('faunadb')
var faunadb = require('faunadb')
q = faunadb.query

var client = new faunadb.Client({ secret: 'fnAE2Oc5SvACTMt3wWZ80CkLo4uu5-AZXW9sZSAw' })

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
                    type: resourceType,
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
        const videTitle = data.videTitle
        var createVideoRessurs = client.query(
        q.Create(
            q.Collection("Video"),
            {
            data: {
                url: videoUrl,
                title: videTitle,
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

async function getAllCategories(){

    var getAllCategoryData = await client.query(
        q.Paginate(q.Match(q.Index("allCategorySORTED")))
    )

    return getAllCategoryData
}

async function getAllCategoryResources(data){
    const categoryRef = data.ref
    
    async function getResource(){
        var resource = await client.query(
            q.Paginate(
                q.Match(
                q.Index('allResourceByCategoryRef'),
                q.Ref(q.Collection("Category"), categoryRef)
                )
            )
        )
        
        
        const resourceData = resource.data
        console.log(resourceData)

        allResourceData =  await resourceData.map(getResourceData)

        console.log(allResourceData)

        return allResourceData
    }
    
    async function getResourceData(resourceData){
        const ref = resourceData[2]
        const type = resourceData[1]

        console.log(resourceData)

        async function getWebsite(){
            var website = await client.query(
                q.Paginate(
                    q.Match(
                      q.Index('websiteByResourceRefSORTED'),
                      q.Ref(q.Collection("Resource"), ref)
                    )
                )
            )
    
            return website
        }
        
        async function getVideo(){
            var video = await client.query(
                q.Paginate(
                    q.Match(
                      q.Index('videoByResourceRefSORTED'),
                      q.Ref(q.Collection("Resource"), ref)
                    )
                )
            )
    
            return video
        }
        
        const data = resourceData
        const website = await getWebsite()
        const video = await getVideo()
    
        if(type === "website"){
            return {data, data:{website}}
        } else if (type === "video"){
            return {data, data:{video}}
        } else { 
            return {data, data:{website, video}}
        }
    
    } 

    
    return getResource()
}


module.exports.createResource = createResource
module.exports.createCategory = createCategory
module.exports.getAllCategories = getAllCategories
module.exports.getAllCategoryResources = getAllCategoryResources