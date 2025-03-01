/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { CheckboxControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import type { Field } from './types';

interface SingleSelectionCheckboxProps< Item > {
	selection: string[];
	onSelectionChange: ( selection: Item[] ) => void;
	item: Item;
	data: Item[];
	getItemId: ( item: Item ) => string;
	primaryField?: Field< Item >;
	disabled: boolean;
}

export default function SingleSelectionCheckbox< Item >( {
	selection,
	onSelectionChange,
	item,
	data,
	getItemId,
	primaryField,
	disabled,
}: SingleSelectionCheckboxProps< Item > ) {
	const id = getItemId( item );
	const isSelected = ! disabled && selection.includes( id );
	let selectionLabel;
	if ( primaryField?.getValue && item ) {
		// eslint-disable-next-line @wordpress/valid-sprintf
		selectionLabel = sprintf(
			/* translators: %s: item title. */
			isSelected ? __( 'Deselect item: %s' ) : __( 'Select item: %s' ),
			primaryField.getValue( { item } )
		);
	} else {
		selectionLabel = isSelected
			? __( 'Select a new item' )
			: __( 'Deselect item' );
	}
	return (
		<CheckboxControl
			className="dataviews-view-table-selection-checkbox"
			__nextHasNoMarginBottom
			aria-label={ selectionLabel }
			aria-disabled={ disabled }
			checked={ isSelected }
			onChange={ () => {
				if ( disabled ) {
					return;
				}

				if ( ! isSelected ) {
					onSelectionChange(
						data.filter( ( _item ) => {
							const itemId = getItemId?.( _item );
							return (
								itemId === id || selection.includes( itemId )
							);
						} )
					);
				} else {
					onSelectionChange(
						data.filter( ( _item ) => {
							const itemId = getItemId?.( _item );
							return (
								itemId !== id && selection.includes( itemId )
							);
						} )
					);
				}
			} }
		/>
	);
}
