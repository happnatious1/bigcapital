import * as Yup from 'yup';
import * as R from 'ramda';
import { isEmpty } from 'lodash';
import intl from 'react-intl-universal';
import moment from 'moment';
import { CellTextSpan } from 'components/Datatable/Cells';
import { getColumnWidth } from 'utils';

const getTableCellValueAccessor = (index) => `cells[${index}].value`;

const Align = { Left: 'left', Right: 'right', Center: 'center' };

/**
 *
 * @returns
 */
export const getBalanceSheetHeaderDefaultValues = () => {
  return {
    basic: 'cash',
    filterByOption: 'without-zero-balance',
    displayColumnsType: 'total',
    fromDate: moment().toDate(),
    toDate: moment().toDate(),
  };
};

/**
 *
 * @returns
 */
export const getBalanceSheetHeaderValidationSchema = () =>
  Yup.object().shape({
    dateRange: Yup.string().optional(),
    fromDate: Yup.date().required().label(intl.get('fromDate')),
    toDate: Yup.date()
      .min(Yup.ref('fromDate'))
      .required()
      .label(intl.get('toDate')),
    filterByOption: Yup.string(),
    displayColumnsType: Yup.string(),
  });

/**
 * Account name column mapper.
 */
const accountNameMapper = R.curry((data, column) => {
  const accessor = getTableCellValueAccessor(column.cell_index);

  return {
    key: column.key,
    Header: column.label,
    accessor,
    className: column.key,
    textOverview: true,
    width: getColumnWidth(data, accessor, { magicSpacing: 10, minWidth: 240 }),
  };
});

/**
 * Assoc columns to total column.
 */
const assocColumnsToTotalColumn = R.curry((data, column, columnAccessor) => {
  const columns = totalColumnsComposer(data, column);

  return R.assoc('columns', columns, columnAccessor);
});

/**
 * Detarmines whether the given column has children columns.
 * @returns {boolean}
 */
const isColumnHasColumns = (column) => !isEmpty(column.children);

/**
 *
 * @param {*} data
 * @param {*} column
 * @returns
 */
const dateRangeSoloColumnAttrs = (data, column) => {
  const accessor = getTableCellValueAccessor(column.cell_index);

  return {
    accessor,
    width: getColumnWidth(data, accessor, { magicSpacing: 10, minWidth: 100 }),
  };
};

/**
 * Date range columns mapper.
 */
const dateRangeMapper = R.curry((data, column) => {
  const isDateColumnHasColumns = isColumnHasColumns(column);

  const columnAccessor = {
    Header: column.label,
    key: column.key,
    disableSortBy: true,
    textOverview: true,
    align: Align.Center,
  };
  return R.compose(
    R.when(
      R.always(isDateColumnHasColumns),
      assocColumnsToTotalColumn(data, column),
    ),
    R.when(
      R.always(!isDateColumnHasColumns),
      R.mergeLeft(dateRangeSoloColumnAttrs(data, column)),
    ),
  )(columnAccessor);
});

/**
 * Total column mapper.
 */
const totalMapper = R.curry((data, column) => {
  const hasChildren = !isEmpty(column.children);
  const accessor = getTableCellValueAccessor(column.cell_index);

  const columnAccessor = {
    key: column.key,
    Header: column.label,
    accessor,
    textOverview: true,
    Cell: CellTextSpan,
    width: getColumnWidth(data, accessor, { magicSpacing: 10, minWidth: 200 }),
    disableSortBy: true,
    align: hasChildren ? 'center' : 'right',
  };
  return R.compose(
    R.when(R.always(hasChildren), assocColumnsToTotalColumn(data, column)),
  )(columnAccessor);
});

/**
 * `Percentage of column` column accessor.
 */
const percentageOfColumnAccessor = R.curry((data, column) => {
  const accessor = getTableCellValueAccessor(column.cell_index);

  return {
    Header: column.label,
    key: column.key,
    accessor,
    width: getColumnWidth(data, accessor, { magicSpacing: 10, minWidth: 100 }),
    align: Align.Right,
    disableSortBy: true,
    textOverview: true,
  };
});

/**
 * `Percentage of row` column accessor.
 */
const percentageOfRowAccessor = R.curry((data, column) => {
  const accessor = getTableCellValueAccessor(column.cell_index);

  return {
    Header: column.label,
    key: column.key,
    accessor,
    width: getColumnWidth(data, accessor, { magicSpacing: 10, minWidth: 100 }),
    align: Align.Right,
    disableSortBy: true,
    textOverview: true,
  };
});

/**
 * Previous year column accessor.
 */
const previousYearAccessor = R.curry((data, column) => {
  const accessor = getTableCellValueAccessor(column.cell_index);

  return {
    Header: column.label,
    key: column.key,
    accessor,
    width: getColumnWidth(data, accessor, { magicSpacing: 10, minWidth: 100 }),
    align: Align.Right,
    disableSortBy: true,
    textOverview: true,
  };
});

/**
 * Pervious year change column accessor.
 */
const previousYearChangeAccessor = R.curry((data, column) => {
  const accessor = getTableCellValueAccessor(column.cell_index);

  return {
    Header: column.label,
    key: column.key,
    accessor,
    width: getColumnWidth(data, accessor, { magicSpacing: 10, minWidth: 100 }),
    align: Align.Right,
    disableSortBy: true,
    textOverview: true,
  };
});

/**
 * Previous year percentage column accessor.
 */
const previousYearPercentageAccessor = R.curry((data, column) => {
  const accessor = getTableCellValueAccessor(column.cell_index);

  return {
    Header: column.label,
    key: column.key,
    accessor,
    width: getColumnWidth(data, accessor, { magicSpacing: 10, minWidth: 100 }),
    align: Align.Right,
    disableSortBy: true,
    textOverview: true,
  };
});

/**
 * Previous period column accessor.
 */
const previousPeriodAccessor = R.curry((data, column) => {
  const accessor = getTableCellValueAccessor(column.cell_index);

  return {
    Header: column.label,
    key: column.key,
    accessor,
    width: getColumnWidth(data, accessor, { magicSpacing: 10, minWidth: 100 }),
    align: Align.Right,
    disableSortBy: true,
    textOverview: true,
  };
});

/**
 * Previous period change column accessor.
 */
const previousPeriodChangeAccessor = R.curry((data, column) => {
  const accessor = getTableCellValueAccessor(column.cell_index);

  return {
    Header: column.label,
    key: column.key,
    accessor,
    width: getColumnWidth(data, accessor, { magicSpacing: 10, minWidth: 100 }),
    align: Align.Right,
    disableSortBy: true,
    textOverview: true,
  };
});

/**
 * Previous period percentage column accessor.
 */
const previousPeriodPercentageAccessor = R.curry((data, column) => {
  const accessor = getTableCellValueAccessor(column.cell_index);

  return {
    Header: column.label,
    key: column.key,
    accessor,
    width: getColumnWidth(data, accessor, { magicSpacing: 10, minWidth: 100 }),
    align: Align.Right,
    disableSortBy: true,
    textOverview: true,
  };
});

/**
 *
 * @param {*} column
 * @param {*} index
 * @returns
 */
const totalColumnsMapper = R.curry((data, column) => {
  return R.compose(
    R.when(R.pathEq(['key'], 'total'), totalMapper(data)),
    // Percetage of column/row.
    R.when(
      R.pathEq(['key'], 'percentage_of_column'),
      percentageOfColumnAccessor(data),
    ),
    R.when(
      R.pathEq(['key'], 'percentage_of_row'),
      percentageOfRowAccessor(data),
    ),
    // Previous year.
    R.when(R.pathEq(['key'], 'previous_year'), previousYearAccessor(data)),
    R.when(
      R.pathEq(['key'], 'previous_year_change'),
      previousYearChangeAccessor(data),
    ),
    R.when(
      R.pathEq(['key'], 'previous_year_percentage'),
      previousYearPercentageAccessor(data),
    ),
    // Pervious period.
    R.when(R.pathEq(['key'], 'previous_period'), previousPeriodAccessor(data)),
    R.when(
      R.pathEq(['key'], 'previous_period_change'),
      previousPeriodChangeAccessor(data),
    ),
    R.when(
      R.pathEq(['key'], 'previous_period_percentage'),
      previousPeriodPercentageAccessor(data),
    ),
  )(column);
});

/**
 * Total sub-columns composer.
 */
const totalColumnsComposer = R.curry((data, column) => {
  return R.map(totalColumnsMapper(data), column.children);
});

/**
 * Detarmines the given string starts with `date-range` string.
 */
const isMatchesDateRange = (r) => R.match(/^date-range/g, r).length > 0;

/**
 * Dynamic column mapper.
 */
const dynamicColumnMapper = R.curry((data, column) => {
  const indexTotalMapper = totalMapper(data);
  const indexAccountNameMapper = accountNameMapper(data);
  const indexDatePeriodMapper = dateRangeMapper(data);

  return R.compose(
    R.when(R.pathSatisfies(isMatchesDateRange, ['key']), indexDatePeriodMapper),
    R.when(R.pathEq(['key'], 'name'), indexAccountNameMapper),
    R.when(R.pathEq(['key'], 'total'), indexTotalMapper),
  )(column);
});

/**
 * Cash flow dynamic columns.
 */
export const dynamicColumns = (columns, data) => {
  return R.map(dynamicColumnMapper(data), columns);
};
