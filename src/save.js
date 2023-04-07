import { useBlockProps, RichText } from '@wordpress/block-editor';
import classnames from 'classnames';

export default function save( { attributes } ) {
	const {
		linkText,
		descriptionText,
		titleText,
		textAlignment,
		shadow,
		shadowOpacity,
		buttonTarget,
		buttonUrl,
		fontSize,
		buttonTextColor,
		buttonBackgroundColor,
		buttonSize,
		borderRadius,
		titleTextColor,
		descriptionTextColor
	} = attributes;

	const classes = classnames( `text-box-align-${ textAlignment }`, {
		'has-shadow': shadow,
		[ `shadow-opacity-${ shadowOpacity }` ]: shadow && shadowOpacity,
	} );

	return (
		<div
			{ ...useBlockProps.save( {
				className: `${ classes } ${ fontSize }`,
			} ) }
		>
			<RichText.Content tagName="h2" value={ titleText } style= {
						{
							color:titleTextColor
						}
					} />
			<RichText.Content tagName="p" value={ descriptionText } style= {
						{
							color:descriptionTextColor
						}
					} />

			<RichText.Content
				tagName="a"
				rel="noreferrer"
				value={ linkText }
				target={ buttonTarget ? '_blank' : '_self' }
				href={ buttonUrl }
				className={ `cta-link-text ${ buttonSize } ${ borderRadius }` }
				style={ {
					backgroundColor: buttonBackgroundColor,
					color: buttonTextColor,
				} }
			/>
		</div>
	);
}
