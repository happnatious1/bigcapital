import React, { useCallback } from 'react';
import {
  NavbarGroup,
  NavbarDivider,
  Button,
  Classes,
  Intent,
  Popover,
  Position,
  PopoverInteractionKind,
} from '@blueprintjs/core';
import { FormattedMessage as T, useIntl } from 'react-intl';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';

import DashboardActionsBar from 'components/Dashboard/DashboardActionsBar';
import { If, Icon, DashboardActionViewsList } from 'components';

import { useCustomersListContext } from './CustomersListProvider';

import withCustomers from './withCustomers';
import withCustomersActions from './withCustomersActions';
import withAlertActions from 'containers/Alert/withAlertActions';

import { compose } from 'utils';

/**
 * Customers actions bar.
 */
function CustomerActionsBar({
  // #withCustomers
  customersSelectedRows = [],

  // #withCustomersActions
  setCustomersTableState,

  // #withAlertActions
  openAlert,
}) {
  // History context.
  const history = useHistory();
  
  // React intl
  const { formatMessage } = useIntl();

  // Customers list context.
  const { customersViews } = useCustomersListContext();

  const onClickNewCustomer = () => {
    history.push('/customers/new');
  };

  // Handle Customers bulk delete button click.,
  const handleBulkDelete = () => {
    openAlert('customers-bulk-delete', { customersIds: customersSelectedRows });
  };

  const handleTabChange = (viewId) => {
    setCustomersTableState({
      customViewId: viewId.id || null,
    });
  };

  return (
    <DashboardActionsBar>
      <NavbarGroup>
        <DashboardActionViewsList
          resourceName={'customers'}
          views={customersViews}
          onChange={handleTabChange}
        />
        <NavbarDivider />

        <Button
          className={Classes.MINIMAL}
          icon={<Icon icon={'plus'} />}
          text={<T id={'new_customer'} />}
          onClick={onClickNewCustomer}
        />
        <NavbarDivider />
        <Popover
          // content={filterDropdown}
          interactionKind={PopoverInteractionKind.CLICK}
          position={Position.BOTTOM_LEFT}
        >
          <Button
            className={classNames(Classes.MINIMAL, 'button--filter')}
            text={`${formatMessage({ id: 'filters_applied' })}`}
            icon={<Icon icon="filter-16" iconSize={16} />}
          />
        </Popover>

        <If condition={customersSelectedRows.length}>
          <Button
            className={Classes.MINIMAL}
            icon={<Icon icon="trash-16" iconSize={16} />}
            text={<T id={'delete'} />}
            intent={Intent.DANGER}
            onClick={handleBulkDelete}
          />
        </If>
        <Button
          className={Classes.MINIMAL}
          icon={<Icon icon="file-import-16" iconSize={16} />}
          text={<T id={'import'} />}
        />
        <Button
          className={Classes.MINIMAL}
          icon={<Icon icon="file-export-16" iconSize={16} />}
          text={<T id={'export'} />}
        />
      </NavbarGroup>
    </DashboardActionsBar>
  );
};

export default compose(
  withCustomersActions,
  withCustomers(({ customersSelectedRows }) => ({
    customersSelectedRows,
  })),
  withAlertActions,
)(CustomerActionsBar);