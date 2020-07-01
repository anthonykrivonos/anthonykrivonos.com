import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'

import ArticlePreviewPage from './preview-templates/ArticlePreviewPage'

CMS.registerMediaLibrary(uploadcare)
CMS.registerMediaLibrary(cloudinary)

CMS.registerPreviewStyle('../App.sass')
CMS.registerPreviewTemplate('article', ArticlePreviewPage as any)