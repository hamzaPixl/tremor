import React, { Dispatch, Ref, SetStateAction } from "react";

import { isEqual } from "date-fns";

import { ArrowDownHeadIcon, CalendarIcon } from "assets";

import {
  border,
  borderRadius,
  boxShadow,
  classNames,
  defaultColors,
  fontSize,
  fontWeight,
  getColorVariantsFromColorThemeValue,
  sizing,
  spacing,
} from "lib";

import { DateRangePickerOption, DateRangePickerValue } from "./DateRangePicker";

const formatSelectedDates = (
  startDate: Date | null,
  endDate: Date | null,
  locale?: Locale
) => {
  const localeCode = locale?.code || "en-US";
  if (!startDate && !endDate) {
    return "";
  } else if (startDate && !endDate) {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return startDate.toLocaleDateString(localeCode, options);
  } else if (startDate && endDate) {
    if (isEqual(startDate, endDate)) {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      return startDate.toLocaleDateString(localeCode, options);
    } else if (
      startDate.getMonth() === endDate.getMonth() &&
      startDate.getFullYear() === endDate.getFullYear()
    ) {
      const optionsStartDate: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
      };
      return `${startDate.toLocaleDateString(localeCode, optionsStartDate)} - 
                    ${endDate.getDate()}, ${endDate.getFullYear()}`;
    } else {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      return `${startDate.toLocaleDateString(localeCode, options)} - 
                    ${endDate.toLocaleDateString(localeCode, options)}`;
    }
  }
  return "";
};

interface DateRangePickerButtonProps {
  value: DateRangePickerValue;
  options: DateRangePickerOption[];
  placeholder: string;
  calendarRef: Ref<HTMLButtonElement>;
  showCalendar: boolean;
  setShowCalendar: Dispatch<SetStateAction<boolean>>;
  onCalendarKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  enableDropdown: boolean;
  dropdownRef: Ref<HTMLButtonElement>;
  showDropdown: boolean;
  setShowDropdown: Dispatch<SetStateAction<boolean>>;
  onDropdownKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  locale?: Locale;
  dropdownPlaceholder?: string;
}

const DateRangePickerButton = ({
  value,
  options,
  placeholder,
  calendarRef,
  showCalendar,
  setShowCalendar,
  onCalendarKeyDown,
  enableDropdown,
  dropdownRef,
  showDropdown,
  setShowDropdown,
  onDropdownKeyDown,
  locale,
  dropdownPlaceholder = "Select",
}: DateRangePickerButtonProps) => {
  const [startDate, endDate, dropdownValue] = value;
  const hasSelection = (startDate || endDate) !== null;
  const calendarText = hasSelection
    ? formatSelectedDates(startDate as Date, endDate as Date, locale)
    : placeholder;
  const dropdownText = dropdownValue
    ? String(options.find((option) => option.value === dropdownValue)?.text)
    : dropdownPlaceholder;

  return (
    <div
      className={classNames(
        "tr-flex tr-items-center tr-justify-between",
        getColorVariantsFromColorThemeValue(defaultColors.white).bgColor,
        getColorVariantsFromColorThemeValue(defaultColors.darkText).textColor,
        borderRadius.md.all,
        boxShadow.sm
      )}
    >
      <button
        type="button"
        ref={calendarRef}
        onClick={() => setShowCalendar(!showCalendar)}
        onKeyDown={onCalendarKeyDown}
        className={classNames(
          `input-elem tr-flex tr-items-center tr-w-full tr-truncate focus:tr-ring-0
                     focus:tr-outline-none`,
          enableDropdown
            ? border.none.right
            : classNames(borderRadius.md.right, border.sm.right),
          getColorVariantsFromColorThemeValue(defaultColors.border).borderColor,
          getColorVariantsFromColorThemeValue(defaultColors.canvasBackground)
            .hoverBgColor,
          spacing.twoXl.paddingLeft,
          spacing.twoXl.paddingRight,
          spacing.sm.paddingTop,
          spacing.sm.paddingBottom,
          borderRadius.md.left,
          border.sm.all
        )}
      >
        <CalendarIcon
          className={classNames(
            "tr-flex-none",
            getColorVariantsFromColorThemeValue(defaultColors.lightText)
              .textColor,
            sizing.lg.height,
            sizing.lg.width,
            spacing.threeXs.negativeMarginLeft,
            spacing.lg.marginRight
          )}
          aria-hidden="true"
        />
        <p
          className={classNames(
            "text-elem tr-whitespace-nowrap tr-truncate",
            fontSize.sm,
            fontWeight.md,
            hasSelection
              ? getColorVariantsFromColorThemeValue(defaultColors.darkText)
                  .textColor
              : getColorVariantsFromColorThemeValue(defaultColors.text)
                  .textColor
          )}
        >
          {calendarText}
        </p>
      </button>
      {enableDropdown ? (
        <button
          type="button"
          ref={dropdownRef}
          onClick={() => setShowDropdown(!showDropdown)}
          className={classNames(
            "input-elem tr-inline-flex tr-justify-between tr-w-48 tr-truncate",
            "focus:tr-ring-0 focus:tr-outline-none",
            getColorVariantsFromColorThemeValue(defaultColors.canvasBackground)
              .hoverBgColor,
            getColorVariantsFromColorThemeValue(defaultColors.border)
              .borderColor,
            spacing.twoXl.paddingLeft,
            spacing.twoXl.paddingRight,
            spacing.px.negativeMarginLeft,
            spacing.sm.paddingTop,
            spacing.sm.paddingBottom,
            borderRadius.md.right,
            border.sm.all
          )}
          onKeyDown={onDropdownKeyDown}
        >
          <p
            className={classNames(
              "text-elem tr-whitespace-nowrap tr-truncate",
              fontSize.sm,
              fontWeight.md,
              dropdownValue
                ? getColorVariantsFromColorThemeValue(defaultColors.darkText)
                    .textColor
                : getColorVariantsFromColorThemeValue(defaultColors.text)
                    .textColor
            )}
          >
            {dropdownText}
          </p>
          <ArrowDownHeadIcon
            className={classNames(
              "tr-flex-none",
              sizing.lg.height,
              sizing.lg.width,
              spacing.twoXs.negativeMarginRight,
              getColorVariantsFromColorThemeValue(defaultColors.lightText)
                .textColor
            )}
            aria-hidden="true"
          />
        </button>
      ) : null}
    </div>
  );
};

export default DateRangePickerButton;
