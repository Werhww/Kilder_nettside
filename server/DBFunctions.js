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
                    categoryRef: q.Ref(q.Collection('Category'), categoryRef),
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
        const videoTitle = data.videoTitle
        var createVideoRessurs = client.query(
        q.Create(
            q.Collection("Video"),
            {
            data: {
                url: videoUrl,
                title: videoTitle,
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
        q.Paginate(q.Match(q.Index("allCategoriesSORTED")))
    )

    return getAllCategoryData
}

async function allResourceByCategoryRef(data){
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
        const allResourceData = []

        for(let i of resourceData){
            allResourceData.push(await getResourceByData(i))
        }

        return allResourceData
    }
    
    async function getResourceByData(data){
        const ref = data[2]
        const type = data[1]

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
        
        const website = await getWebsite()
        const video = await getVideo()
    
        if(type === "website"){
            return {data, info:{website}}
        } else if (type === "video"){
            return {data, info:{video}}
        } else { 
            return {data, info:{website, video}}
        }
    
    } 

    
    return getResource()
}

async function deleteCategory(data){

    var categoryCheck = client.query(
        q.Exists(
            q.Ref(q.Collection('Category'),
            data.categoryRef
          )
        )
    )

    if(categoryCheck == true){
        deleting(data)
    }


    async function deleting(data){
        var categoryData = await client.query(
            q.Paginate(
                q.Match(
                    q.Index("deleteResourcesData"),
                    data.categoryRef
                )
            )
        )
    
        // Deletes Category
        client.query(
            q.Delete(q.Ref(q.Collection('Category'), data.categoryRef))
        )
    
        // Deletes website part of resource
        async function deleteWebsite(ref){
            var resourceData = await client.query(
                q.Paginate(
                    q.Match(
                        q.Index("deleteWebsiteData"),
                        ref
                    )
                )
            )
    
            client.query(
                q.Delete(q.Ref(q.Collection('Website'), resourceData.data[0]))
            )
        }
    
        // Deletes video part of resource
        async function deleteVideo(ref){
            var resourceData = await client.query(
                q.Paginate(
                    q.Match(
                        q.Index("deleteVideoData"),
                        ref
                    )
                )
            )   
    
            client.query(
                q.Delete(q.Ref(q.Collection('Video'), resourceData.data[0]))
            )
        }
    
        // Deletes resource
        async function deleteResource(d){
            let ref = d[1]
    
    
            if(d[0] == "website"){
                deleteWebsite(ref)
            } else if (d[0] == "video"){
                deleteVideo(ref)
            } else {
                deleteWebsite(ref)
                deleteVideo(ref)
            }
    
            client.query(
                q.Delete(q.Ref(q.Collection('Resource'), ref))
            )
        }
    
    
        for(let i of categoryData.data){
            deleteResource(i)
        }
    }

    
}

async function deleteResource(data){

    var resourceCheck = client.query(
        q.Exists(
            q.Ref(q.Collection('Category'),
            data.ref
          )
        )
    )

    if(resourceCheck == true){
        deleteResource(data)
    } else {

    }


   // Deletes website part of resource
   async function deleteWebsite(ref){
        var resourceData = await client.query(
            q.Paginate(
                q.Match(
                    q.Index("deleteWebsiteData"),
                    ref
                )
            )
        )

        client.query(
            q.Delete(q.Ref(q.Collection('Website'), resourceData.data[0]))
        )
    }

    // Deletes video part of resource
    async function deleteVideo(ref){
        var resourceData = await client.query(
            q.Paginate(
                q.Match(
                    q.Index("deleteVideoData"),
                    ref
                )
            )
        )   

        client.query(
            q.Delete(q.Ref(q.Collection('Video'), resourceData.data[0]))
        )
    }

    // Deletes resource
    async function deleteResource(d){
        let ref = d.ref


        if(d.type == "website"){
            deleteWebsite(ref)
        } else if (d.type == "video"){
            deleteVideo(ref)
        } else {
            deleteWebsite(ref)
            deleteVideo(ref)
        }

        client.query(
            q.Delete(q.Ref(q.Collection('Resource'), ref))
        )
    }
}


module.exports.createResource = createResource
module.exports.createCategory = createCategory
module.exports.getAllCategories = getAllCategories
module.exports.allResourceByCategoryRef = allResourceByCategoryRef
module.exports.deleteCategory = deleteCategory
module.exports.deleteResource = deleteResource