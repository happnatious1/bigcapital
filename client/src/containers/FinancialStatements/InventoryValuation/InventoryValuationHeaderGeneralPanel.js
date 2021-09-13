import React from 'react';
import { FastField, Field } from 'formik';
import { DateInput } from '@blueprintjs/datetime';
import { FormGroup, Position, Classes } from '@blueprintjs/core';
import classNames from 'classnames';
import { FormattedMessage as T } from 'components';
import { ItemsMultiSelect, Row, Col, FieldHint } from 'components';
import {
  momentFormatter,
  tansformDateValue,
  inputIntent,
  handleDateChange,
} from 'utils';
import {
  InventoryValuationGeneralPanelProvider,
  useInventoryValuationGeneralPanelContext,
} from './InventoryValuationHeaderGeneralPanelProvider';

/**
 * Inventory valuation - Drawer Header - General panel.
 */
export default function InventoryValuationHeaderGeneralPanel() {
  return (
    <InventoryValuationGeneralPanelProvider>
      <InventoryValuationHeaderGeneralPanelContent />
    </InventoryValuationGeneralPanelProvider>
  );
}

/**
 * Inventory valuation - Drawer Header - General panel - Content.
 */
function InventoryValuationHeaderGeneralPanelContent() {
  const { items } = useInventoryValuationGeneralPanelContext();

  return (
    <div>
      <Row>
        <Col xs={5}>
          <FastField name={'asDate'}>
            {({ form, field: { value }, meta: { error } }) => (
              <FormGroup
                label={<T id={'as_date'} />}
                labelInfo={<FieldHint />}
                fill={true}
                intent={inputIntent({ error })}
              >
                <DateInput
                  {...momentFormatter('YYYY/MM/DD')}
                  value={tansformDateValue(value)}
                  onChange={handleDateChange((selectedDate) => {
                    form.setFieldValue('asDate', selectedDate);
                  })}
                  popoverProps={{ position: Position.BOTTOM, minimal: true }}
                  minimal={true}
                  fill={true}
                />
              </FormGroup>
            )}
          </FastField>
        </Col>
      </Row>

      <Row>
        <Col xs={5}>
          <Field name={'itemsIds'}>
            {({
              form: { setFieldValue },
              field: { value },
              meta: { error, touched },
            }) => (
              <FormGroup
                label={<T id={'Specific items'} />}
                className={classNames('form-group--select-list', Classes.FILL)}
              >
               
              </FormGroup>
            )}
          </Field>
        </Col>
      </Row>
    </div>
  );
}
