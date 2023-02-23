const listHelper=require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })

describe('total likes', () => {
    const listWithMultipleBlogs = [
        {
            title: "blog1",
            author: "author1",
            url: "https://blog1.com/",
            likes: 34
        },
        {
            title: "blog2",
            author: "author2",
            url: "https://blog2.com",
            likes: 86
        },
        {
            title: "blog3",
            author: "author1",
            url: "https://blog3.com/",
            likes: 10
        },
        {
            title: "blog4",
            author: "author2",
            url: "https://blog4.com",
            likes: 34
        },
        {
            title: "blog5",
            author: "author3",
            url: "https://blog5.com/",
            likes: 72
        },
        {
            title: "blog6",
            author: "author1",
            url: "https://blog6.com/",
            likes: 5
        }
    ]

    test('the total sum of likes in all of the blog posts', () => {
      const result = listHelper.totalLikes(listWithMultipleBlogs)
      expect(result).toBe(241)
    })
})

describe("favorite blog", () => {
    
    const listWithMultipleBlogs = [
        {
            title: "blog1",
            author: "author1",
            url: "https://blog1.com/",
            likes: 34
        },
        {
            title: "blog2",
            author: "author2",
            url: "https://blog2.com",
            likes: 86
        },
        {
            title: "blog3",
            author: "author1",
            url: "https://blog3.com/",
            likes: 10
        },
        {
            title: "blog4",
            author: "author2",
            url: "https://blog4.com",
            likes: 34
        },
        {
            title: "blog5",
            author: "author3",
            url: "https://blog5.com/",
            likes: 72
        },
        {
            title: "blog6",
            author: "author1",
            url: "https://blog6.com/",
            likes: 5
        }
    ]
    test(" finds out which blog has the most likes", () => {
      const result = listHelper.favoriteBlog(listWithMultipleBlogs);
      expect(result).toEqual(listWithMultipleBlogs[1]);
    });
});

describe("most blogs", () => {
    const listWithMultipleBlogs = [
        {
            title: "blog1",
            author: "author1",
            url: "https://blog1.com/",
            likes: 34
        },
        {
            title: "blog2",
            author: "author2",
            url: "https://blog2.com",
            likes: 86
        },
        {
            title: "blog3",
            author: "author1",
            url: "https://blog3.com/",
            likes: 10
        },
        {
            title: "blog4",
            author: "author2",
            url: "https://blog4.com",
            likes: 34
        },
        {
            title: "blog5",
            author: "author3",
            url: "https://blog5.com/",
            likes: 72
        },
        {
            title: "blog6",
            author: "author1",
            url: "https://blog6.com/",
            likes: 5
        }
    ]

    test("the author who has the largest amount of blogs", () => {
      const result = listHelper.mostBlogs(listWithMultipleBlogs);
      expect(result).toEqual({author:"author1",blogs:3});
    });
});

describe("most likes", () => {
    const listWithMultipleBlogs = [
        {
            title: "blog1",
            author: "author1",
            url: "https://blog1.com/",
            likes: 34
        },
        {
            title: "blog2",
            author: "author2",
            url: "https://blog2.com",
            likes: 86
        },
        {
            title: "blog3",
            author: "author1",
            url: "https://blog3.com/",
            likes: 10
        },
        {
            title: "blog4",
            author: "author2",
            url: "https://blog4.com",
            likes: 34
        },
        {
            title: "blog5",
            author: "author3",
            url: "https://blog5.com/",
            likes: 72
        },
        {
            title: "blog6",
            author: "author1",
            url: "https://blog6.com/",
            likes: 5
        }
    ]
    test("the author, whose blog posts have the largest amount of likes", () => {
      const result = listHelper.mostLikes(listWithMultipleBlogs);
      expect(result).toEqual({author:"author2",likes:120});
    });
});




