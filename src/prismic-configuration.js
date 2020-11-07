import Prismic from 'prismic-javascript'

const apiEndpoint = 'https://darthvader-blog.prismic.io/api/v2'

// -- Access token if the Master is not open
const accessToken = 'MC5YNmNWY1JJQUFDUUF2VVJL.HWsn77-977-9Fu-_ve-_vQ5577-9Dy_vv73vv71U77-9HADvv73vv73vv71t77-9Rwnvv71377-977-9S--_vQ'

// OAuth
// clientId: 'xxxxxx',
// clientSecret: 'xxxxxx',

// -- Links resolution rules
// This function will be used to generate links to Prismic documents
// As your project grows, you should update this function according to your routes
export const linkResolver = (doc) => {
  if (doc.type === 'post') return `/blog/${doc.uid}`
  return '/'
}

export const client = Prismic.client(apiEndpoint, { accessToken })
