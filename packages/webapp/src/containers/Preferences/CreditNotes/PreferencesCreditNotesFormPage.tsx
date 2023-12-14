// @ts-nocheck
import React, { useEffect } from 'react';
import intl from 'react-intl-universal';
import { Formik } from 'formik';
import { Intent } from '@blueprintjs/core';

import { AppToaster } from '@/components';
import { PreferencesCreditNotesFormSchema } from './PreferencesCreditNotesForm.schema';
import { usePreferencesCreditNotesFormContext } from './PreferencesCreditNotesFormBoot';
import { PreferencesCreditNotesForm } from './PreferencesCreditNotesForm';
import withDashboardActions from '@/containers/Dashboard/withDashboardActions';

import { compose, transformToForm } from '@/utils';

const defaultValues = {
  termsConditions: '',
  customerNotes: '',
};

/**
 * Preferences - Credit Notes.
 */
function PreferencesCreditNotesFormPageRoot({
  // #withDashboardActions
  changePreferencesPageTitle,
}) {
  const { organization } = usePreferencesCreditNotesFormContext();

  useEffect(() => {
    changePreferencesPageTitle(intl.get('preferences.creditNotes'));
  }, [changePreferencesPageTitle]);

  // Initial values.
  const initialValues = {
    ...defaultValues,
    ...transformToForm(organization.metadata, defaultValues),
  };
  // Handle the form submit.
  const handleFormSubmit = (values, { setSubmitting }) => {
    // Handle request success.
    const onSuccess = (response) => {
      AppToaster.show({
        message: intl.get('preferences.estimates.success_message'),
        intent: Intent.SUCCESS,
      });
      setSubmitting(false);
    };
    // Handle request error.
    const onError = () => {
      setSubmitting(false);
    };
    // updateOrganization({ ...values })
    //   .then(onSuccess)
    //   .catch(onError);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={PreferencesCreditNotesFormSchema}
      onSubmit={handleFormSubmit}
      component={PreferencesCreditNotesForm}
    />
  );
}

export const PreferencesCreditNotesFormPage = compose(withDashboardActions)(
  PreferencesCreditNotesFormPageRoot,
);
