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
    favoriteBlog
}