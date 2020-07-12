import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { View, ViewProps } from './View'

export interface WrapperProps extends ViewProps {
	path?: string
}

export class Wrapper extends Component<WrapperProps> {

	public render = () => {
		return (
			<View>
				<Helmet>
					<html lang="en" />
					<title>Anthony Krivonos</title>
					<meta name="description" content={'Anthony\'s portfolio website.'} />
					<meta name="theme-color" content="#fff" />
					<meta property="og:type" content="business.business" />
					<meta property="og:title" content={'Anthony Krivonos'} />
					<meta property="og:url" content="/" />
					<script
						src="https://code.jquery.com/jquery-3.5.1.min.js"
						integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
						crossOrigin="anonymous">
					</script>
					<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Open+Sans:ital,wght@0,400;0,700;0,800;1,700&family=Playfair+Display:ital,wght@0,400;0,500;0,700;0,900;1,700&display=swap"/>
					<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"/>
					<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossOrigin="anonymous"></script>
					<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossOrigin="anonymous"></script>
				</Helmet>
				<View {...this.props as any} />
			</View>
		)
	}
}