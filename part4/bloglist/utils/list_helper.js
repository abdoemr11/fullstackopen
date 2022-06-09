const _  = require('lodash')
function mostBlogs(blogs) {
    const countAuthor = _.countBy(blogs, _.iteratee('author'))
    const maxKey = _.max(_.keys(countAuthor), k => countAuthor[k])
    return {
        author : maxKey,
        blogs: countAuthor[maxKey]
    }
}
function mostLikes(blogs) {
    const groupAuthor = _.groupBy(blogs, _.iteratee('author'))
    let likeAuthor = []
    _.forEach(_.keys(groupAuthor), k => {
        // const sumLikes = _.sum(groupAuthor[k], blog => blog.likes)
        let obj = { author: k, likes: _.sumBy(groupAuthor[k], 'likes') }
        likeAuthor = likeAuthor.concat(obj)
        // console.log(sumLikes)
    })
    // console.log(likeAuthor)
    // console.log( _.maxBy(likeAuthor, _.iteratee('likes')))
    return _.maxBy(likeAuthor, _.iteratee('likes'))
}
function favoriteBlog(list) {
    if (list.length === 0)
        return null
    const fav_blog = list.reduce((p, c) => p.likes > c.likes ? p : c)
    return {
        'title': fav_blog.title,
        'author': fav_blog.author,
        'likes': fav_blog.likes
    }
}

function countLikes(blogs) {
    if (blogs.length === 0)
        return 0
    let sum = blogs.reduce((p, c) => p + c.likes, 0)
    console.log(sum)
    return sum
}

const dummy = (blogs) => {
    return 1
}

module.exports = {
    dummy,
    countLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}