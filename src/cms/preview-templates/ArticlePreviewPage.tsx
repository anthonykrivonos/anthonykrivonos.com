import React from 'react'

import { Article } from '../../templates'
import { View } from '../../components'
import { Article as ArticleInterface } from '../../models'

const ArticlePreviewPage = ({ entry }) => {
	const article:ArticleInterface = entry.getIn(['data']).toJS()
	return article ? <Article article={article} isPreview={true} /> : <View>Loading...</View>
}

export default ArticlePreviewPage