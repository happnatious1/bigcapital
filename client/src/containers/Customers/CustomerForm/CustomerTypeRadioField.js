import React from 'react';
import classNames from 'classnames';
import { RadioGroup, Radio, FormGroup } from '@blueprintjs/core';
import { FormattedMessage as T, useIntl } from 'react-intl';
import { FastField } from 'formik';

import { handleStringChange, saveInvoke } from 'utils';

/**
 * Customer type radio field.
 */
export default function RadioCustomer(props) {
  const { onChange, ...rest } = props;
  const { formatMessage } = useIntl();

  return (
    <FastField name={'customer_type'}>
      {({ form, field: { value }, meta: { error, touched } }) => (
        <FormGroup
          inline={true}
          label={<T id={'customer_type'} />}
          className={classNames('form-group--customer_type')}
        >
          <RadioGroup
            inline={true}
            onChange={handleStringChange((value) => {
              saveInvoke(onChange, value);
              form.setFieldValue('customer_type', value);
            })}
            selectedValue={value}
          >
            <Radio label={formatMessage({ id: 'business' })} value="business" />
            <Radio
              label={formatMessage({ id: 'individual' })}
              value="individual"
            />
          </RadioGroup>
        </FormGroup>
      )}
    </FastField>
  );
}