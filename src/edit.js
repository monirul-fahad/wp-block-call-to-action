import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
	URLInput,
	ContrastChecker,
	PanelColorSettings
} from '@wordpress/block-editor';
import { PanelBody, RangeControl, IconButton } from '@wordpress/components';
const { SelectControl } = wp.components;
import classnames from 'classnames';
import './editor.scss';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const {
		linkText,
		descriptionText,
		titleText,
		textAlignment,
		shadow,
		shadowOpacity,
		links,
		buttonUrl,
		fontSize,
		buttonSize,
		borderRadius,
		buttonTextColor,
		buttonBackgroundColor,
		titleTextColor,
		descriptionTextColor
	} = attributes;

	const onChangeAlignment = ( newAlignment ) => {
		setAttributes( { textAlignment: newAlignment } );
	};
	const onChangeText = ( newText ) => {
		setAttributes( { linkText: newText } );
	};
	const onChangeTitleText = ( newText ) => {
		setAttributes( { titleText: newText } );
	};
	const onChangeDescriptionText = ( newText ) => {
		setAttributes( { descriptionText: newText } );
	};
	const onChangeTitleTextColor = ( newColor ) => {
		setAttributes( { titleTextColor: newColor } );
	};
	const onChangeDescriptionTextColor = ( newColor ) => {
		setAttributes( { descriptionTextColor: newColor } );
	};
	const onChangeShadowOpacity = ( newShadowOpacity ) => {
		setAttributes( { shadowOpacity: newShadowOpacity } );
	};
	const onChangeButtonBackgroundColor = ( newBgColor ) => {
		setAttributes( { buttonBackgroundColor: newBgColor } );
	};
	const onChangeButtonTextColor = ( newTextColor ) => {
		setAttributes( { buttonTextColor: newTextColor } );
	};
	const toggleShadow = () => {
		setAttributes( { shadow: ! shadow } );
	};
	const toggleLinks = () => {
		setAttributes( { links: ! links } );
	};

	const classes = classnames( `text-box-align-${ textAlignment }`, {
		'has-shadow': shadow,
		[ `shadow-opacity-${ shadowOpacity }` ]: shadow && shadowOpacity,
	} );

	const buttonSizeOptions = [
		{ value: 'size-small', label: __( 'Small', 'call-to-action' ) },
		{ value: 'size-normal', label: __( 'Normal', 'call-to-action' ) },
		{ value: 'size-medium', label: __( 'Medium', 'call-to-action' ) },
		{ value: 'size-large', label: __( 'Large', 'call-to-action' ) },
		{ value: 'size-extra-large', label: __( 'Extra Large', 'call-to-action' ) },
	];

	const borderRadiusOptions = [
		{ value: 'border-radius-squared', label: __( 'Squared', 'call-to-action' ) },
		{ value: 'border-radius-rounded', label: __( 'Rounded', 'call-to-action' ) },
		{ value: 'border-radius-circular', label: __( 'Circular', 'call-to-action' ) },
		{
			value: 'border-radius-extra-circular',
			label: __( 'Extra Circular', 'call-to-action' ),
		},
	];

	return (
		<>
			<InspectorControls>
				{ shadow && (
					<PanelBody
						title={ __( 'Shadow Setting', 'call-to-action' ) }
					>
						<RangeControl
							label={ __( 'Shadow Opacity', 'call-to-action' ) }
							value={ shadowOpacity }
							min={ 10 }
							max={ 40 }
							step={ 10 }
							onChange={ onChangeShadowOpacity }
						/>
					</PanelBody>
				) }
				<PanelBody title={ __( 'Text Setting', 'call-to-action' ) } initialOpen={ false }>
				<PanelColorSettings
					initialOpen
					disableCustomColors={ false }
					colorSettings={ [
						{
							value: titleTextColor,
							onChange: onChangeTitleTextColor,
							label: __( 'Title color', 'call-to-action' ),
						},
						{
							value: descriptionTextColor,
							onChange: onChangeDescriptionTextColor,
							label: __( 'Description color', 'call-to-action' ),
						}
					] }
				>
					<ContrastChecker
						textColor={ buttonTextColor }
						backgroundColor={ buttonBackgroundColor }
					/>
				</PanelColorSettings>
				</PanelBody>
				<PanelBody title={ __( 'Button Setting', 'call-to-action' ) } initialOpen={ false }>
					 <SelectControl
						label={ __( 'Button Size', 'call-to-action' ) }
						value={ buttonSize }
						options={ buttonSizeOptions.map(
							( { value, label } ) => ( {
								value,
								label,
							} )
						) }
						onChange={ ( newSize ) => {
							setAttributes( { buttonSize: newSize } );
						} }
					/>
					<SelectControl
						label={ __( 'Border Radius', 'call-to-action' ) }
						value={ borderRadius }
						options={ borderRadiusOptions.map(
							( { value, label } ) => ( {
								value,
								label,
							} )
						) }
						onChange={ ( newSize ) => {
							setAttributes( { borderRadius: newSize } );
						} }
					/>
					<PanelColorSettings
					initialOpen
					disableCustomColors={ false }
					colorSettings={ [
						{
							value: buttonBackgroundColor,
							onChange: onChangeButtonBackgroundColor,
							label: __( 'Button Background Color', 'call-to-action' ),
						},
						{
							value: buttonTextColor,
							onChange: onChangeButtonTextColor,
							label: __( 'Button Text Color', 'call-to-action' ),
						},
					] }
				>
					<ContrastChecker
						textColor={ buttonTextColor }
						backgroundColor={ buttonBackgroundColor }
					/>
				</PanelColorSettings>
				</PanelBody>
				
			</InspectorControls>
			<BlockControls
				controls={ [
					{
						icon: 'admin-page',
						title: __( 'Shadow', 'call-to-action' ),
						onClick: toggleShadow,
						isActive: shadow,
					},
					,
					{
						icon: 'admin-links',
						title: __( 'Links', 'call-to-action-link' ),
						onClick: toggleLinks,
						isActive: links,
					},
				] }
			>
				<AlignmentToolbar
					value={ textAlignment }
					onChange={ onChangeAlignment }
				/>
			</BlockControls>
			<div
				{ ...useBlockProps( {
					className: `${ classes } ${ fontSize }`,
				} ) }
			>
				<RichText
					className="call-to-action"
					onChange={ onChangeTitleText }
					value={ titleText }
					placeholder={ __(
						'Your Heading',
						 'call-to-action'
					) }
					tagName="h2"
					allowedFormats={ [] }
					style= {
						{
							color:titleTextColor
						}
					}
				/>
				<RichText
					className="call-to-action"
					onChange={ onChangeDescriptionText }
					value={ descriptionText }
					placeholder={ __(
						'Your description',
						 'call-to-action'
					) }
					tagName="p"
					allowedFormats={ [] }
					style= {
						{
							color:descriptionTextColor
						}
					}
				/>
				<RichText
					style= {
						{
							backgroundColor:buttonBackgroundColor,
							color:buttonTextColor
						}
					}
					className={`cta-link-text ${buttonSize} ${borderRadius}`}
					onChange={ onChangeText }
					value={ linkText }
					placeholder={ __( 'Your Text', 'call-to-action' ) }
					tagName="a"
					allowedFormats={ [] }
				/>
				{ links && (
					<div className={ `call-to-action-link-form` }>
						<form
							onSubmit={ ( event ) => event.preventDefault() }
							className={ `bk-button bk-button-dual` }
						>
							<URLInput
								className="button-url"
								value={ buttonUrl }
								onChange={ ( value ) =>
									setAttributes( { buttonUrl: value } )
								}
							/>
							<IconButton
								icon="editor-break"
								label={ __( 'Apply', 'call-to-action' ) }
								type="submit"
							/>
						</form>
					</div>
				) }
			</div>
		</>
	);
}
