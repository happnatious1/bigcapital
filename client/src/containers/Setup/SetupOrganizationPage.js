import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import moment from 'moment';
import { FormattedMessage as T, useIntl } from 'react-intl';
import { snakeCase } from 'lodash';

import { withWizard } from 'react-albus';
import { useQuery } from 'react-query';

import 'style/pages/Setup/Organization.scss';

import SetupOrganizationForm from './SetupOrganizationForm';

import withSettingsActions from 'containers/Settings/withSettingsActions';
import withSettings from 'containers/Settings/withSettings';
import withOrganizationActions from 'containers/Organization/withOrganizationActions';

import {
  compose,
  transformToForm,
  optionsMapToArray,
} from 'utils';

/**
 * Setup organization form.
 */
function SetupOrganizationPage({
  // #withSettingsActions
  requestSubmitOptions,
  requestFetchOptions,

  // #withOrganizationActions
  requestOrganizationSeed,

  // #withSettings
  organizationSettings,

  wizard,
  setOrganizationSetupCompleted,
}) {
  const { formatMessage } = useIntl();

  const fetchSettings = useQuery(['settings'], () => requestFetchOptions({}));

  // Validation schema.
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required()
      .label(formatMessage({ id: 'organization_name_' })),
    financialDateStart: Yup.date()
      .required()
      .label(formatMessage({ id: 'date_start_' })),
    baseCurrency: Yup.string()
      .required()
      .label(formatMessage({ id: 'base_currency_' })),
    language: Yup.string()
      .required()
      .label(formatMessage({ id: 'language' })),
    fiscalYear: Yup.string()
      .required()
      .label(formatMessage({ id: 'fiscal_year_' })),
    timeZone: Yup.string()
      .required()
      .label(formatMessage({ id: 'time_zone_' })),
  });

  // Initial values.
  const defaultValues = {
    name: '',
    financialDateStart: moment(new Date()).format('YYYY-MM-DD'),
    baseCurrency: '',
    language: '',
    fiscalYear: '',
    timeZone: '',
    ...organizationSettings,
  };

  const initialValues = {
    ...defaultValues,

    /**
     * We only care about the fields in the form. Previously unfilled optional
     * values such as `notes` come back from the API as null, so remove those
     * as well.
     */
    ...transformToForm(organizationSettings, defaultValues),
  };

  // Handle the form submit.
  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    const options = optionsMapToArray(values).map((option) => {
      return { ...option, key: snakeCase(option.key), group: 'organization' };
    });
    requestSubmitOptions({ options })
      .then(() => {
        return requestOrganizationSeed();
      })
      .then(() => {
        return setOrganizationSetupCompleted(true);
      })
      .then((response) => {
        setSubmitting(false);
        wizard.next();
      })
      .catch((erros) => {
        setSubmitting(false);
      });
  };

  return (
    <div className={'setup-organization'}>
      <div className={'setup-organization__title-wrap'}>
        <h1>
          <T id={'let_s_get_started'} />
        </h1>
        <p class="paragraph">
          <T id={'tell_the_system_a_little_bit_about_your_organization'} />
        </p>
      </div>

      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        component={SetupOrganizationForm}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default compose(
  withSettingsActions,
  withOrganizationActions,
  withWizard,
  withSettings(({ organizationSettings }) => ({
    organizationSettings,
  })),
)(SetupOrganizationPage);