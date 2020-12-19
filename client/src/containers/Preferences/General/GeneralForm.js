import { Form } from 'formik';
import React from 'react';
import {
  Button,
  FormGroup,
  InputGroup,
  Intent,
  Position,
} from '@blueprintjs/core';
import classNames from 'classnames';
import { TimezonePicker } from '@blueprintjs/timezone';
import { ErrorMessage, FastField } from 'formik';
import { FormattedMessage as T } from 'react-intl';
import { DateInput } from '@blueprintjs/datetime';
import { useHistory } from 'react-router-dom';
import { ListSelect, FieldRequiredHint } from 'components';
import {
  inputIntent,
  momentFormatter,
  tansformDateValue,
  handleDateChange,
} from 'utils';
import { CLASSES } from 'common/classes';
import countriesOptions from 'common/countries';
import currencies from 'common/currencies';
import fiscalYearOptions from 'common/fiscalYearOptions';
import languages from 'common/languagesOptions';
import dateFormatsOptions from 'common/dateFormatsOptions';

export default function PreferencesGeneralForm({}) {
  const history = useHistory();

  const handleCloseClick = () => {
    history.go(-1);
  };

  return (
    <Form>
      <FastField name={'name'}>
        {({ field, meta: { error, touched } }) => (
          <FormGroup
            label={<T id={'organization_name'} />}
            labelInfo={<FieldRequiredHint />}
            inline={true}
            intent={inputIntent({ error, touched })}
            helperText={<ErrorMessage name="name" />}
            className={'form-group--org-name'}
          >
            <InputGroup medium={'true'} {...field} />
          </FormGroup>
        )}
      </FastField>

      <FastField name={'financial_date_start'}>
        {({ form, field: { value }, meta: { error, touched } }) => (
          <FormGroup
            label={<T id={'financial_starting_date'} />}
            labelInfo={<FieldRequiredHint />}
            inline={true}
            intent={inputIntent({ error, touched })}
            helperText={<ErrorMessage name="financial_date_start" />}
            className={classNames('form-group--select-list', CLASSES.FILL)}
          >
            <DateInput
              {...momentFormatter('MMMM Do YYYY')}
              value={tansformDateValue(value)}
              onChange={handleDateChange((formattedDate) => {
                form.setFieldValue('financial_date_start', formattedDate);
              })}
              popoverProps={{ position: Position.BOTTOM, minimal: true }}
            />
          </FormGroup>
        )}
      </FastField>

      <FastField name={'industry'}>
        {({ field, meta: { error, touched } }) => (
          <FormGroup
            label={<T id={'organization_industry'} />}
            inline={true}
            intent={inputIntent({ error, touched })}
            helperText={<ErrorMessage name="industry" />}
            className={'form-group--org-industry'}
          >
            <InputGroup medium={'true'} {...field} />
          </FormGroup>
        )}
      </FastField>

      <FastField name={'location'}>
        {({ field: { value }, meta: { error, touched } }) => (
          <FormGroup
            label={<T id={'business_location'} />}
            className={classNames(
              'form-group--business-location',
              CLASSES.FILL,
            )}
            inline={true}
            helperText={<ErrorMessage name="location" />}
            intent={inputIntent({ error, touched })}
          >
            <ListSelect
              items={countriesOptions}
              onItemSelect={(item) => {}}
              selectedItem={value}
              selectedItemProp={'value'}
              defaultText={<T id={'select_business_location'} />}
              labelProp={'name'}
              popoverProps={{ minimal: true }}
            />
          </FormGroup>
        )}
      </FastField>

      <FastField name={'base_currency'}>
        {({ form, field: { value }, meta: { error, touched } }) => (
          <FormGroup
            label={<T id={'base_currency'} />}
            labelInfo={<FieldRequiredHint />}
            className={classNames('form-group--base-currency', CLASSES.FILL)}
            inline={true}
            helperText={<ErrorMessage name="base_currency" />}
            intent={inputIntent({ error, touched })}
          >
            <ListSelect
              items={currencies}
              onItemSelect={(currency) => {
                form.setFieldValue('base_currency', currency.code);
              }}
              selectedItem={value}
              selectedItemProp={'code'}
              defaultText={<T id={'select_base_currency'} />}
              labelProp={'label'}
              popoverProps={{ minimal: true }}
            />
          </FormGroup>
        )}
      </FastField>

      <FastField name={'fiscal_year'}>
        {({ form, field: { value }, meta: { error, touched } }) => (
          <FormGroup
            label={<T id={'fiscal_year'} />}
            labelInfo={<FieldRequiredHint />}
            className={classNames('form-group--fiscal-year', CLASSES.FILL)}
            inline={true}
            helperText={<ErrorMessage name="fiscal_year" />}
            intent={inputIntent({ error, touched })}
          >
            <ListSelect
              items={fiscalYearOptions}
              selectedItemProp={'value'}
              labelProp={'name'}
              defaultText={<T id={'select_fiscal_year'} />}
              selectedItem={value}
              onItemSelect={(item) => {}}
              popoverProps={{ minimal: true }}
            />
          </FormGroup>
        )}
      </FastField>

      <FastField name={'language'}>
        {({ form, field: { value }, meta: { error, touched } }) => (
          <FormGroup
            label={<T id={'language'} />}
            labelInfo={<FieldRequiredHint />}
            inline={true}
            className={classNames('form-group--language', CLASSES.FILL)}
            intent={inputIntent({ error, touched })}
            helperText={<ErrorMessage name="language" />}
          >
            <ListSelect
              items={languages}
              selectedItemProp={'value'}
              labelProp={'name'}
              defaultText={<T id={'select_language'} />}
              selectedItem={value}
              onItemSelect={(item) => {}}
              popoverProps={{ minimal: true }}
            />
          </FormGroup>
        )}
      </FastField>

      <FastField name={'time_zone'}>
        {({ form, field: { value }, meta: { error, touched } }) => (
          <FormGroup
            label={<T id={'time_zone'} />}
            labelInfo={<FieldRequiredHint />}
            inline={true}
            className={classNames(
              'form-group--time-zone',
              CLASSES.FORM_GROUP_LIST_SELECT,
              CLASSES.FILL,
            )}
            intent={inputIntent({ error, touched })}
            helperText={<ErrorMessage name="time_zone" />}
          >
            <TimezonePicker
              value={value}
              onChange={(timezone) => {
                form.setFieldValue('time_zone', timezone);
              }}
              valueDisplayFormat="composite"
              placeholder={<T id={'select_time_zone'} />}
            />
          </FormGroup>
        )}
      </FastField>

      <FastField name={'date_format'}>
        {({ form, field: { value }, meta: { error, touched } }) => (
          <FormGroup
            label={<T id={'date_format'} />}
            labelInfo={<FieldRequiredHint />}
            inline={true}
            className={classNames('form-group--date-format', CLASSES.FILL)}
            intent={inputIntent({ error, touched })}
            helperText={<ErrorMessage name="date_format" />}
          >
            <ListSelect
              items={dateFormatsOptions}
              onItemSelect={(dateFormat) => {
                form.setFieldValue('date_format', dateFormat);
              }}
              selectedItem={value}
              selectedItemProp={'value'}
              defaultText={<T id={'select_date_format'} />}
              labelProp={'name'}
              popoverProps={{ minimal: true }}
            />
          </FormGroup>
        )}
      </FastField>

      <div className={'card__footer'}>
        <Button
          intent={Intent.PRIMARY}
          type="submit"
        >
          <T id={'save'} />
        </Button>
        <Button onClick={handleCloseClick}>
          <T id={'close'} />
        </Button>
      </div>
    </Form>
  );
}