import {
    Grid,
    TextField,
    Chip,
    Autocomplete,
    Typography,
} from '@mui/material';
import NumberFormat from 'react-number-format';
import { withStyles } from '@mui/styles';

const StyledTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#ff5f5f',
        },
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                color: '#ff5f5f',
                borderColor: '#ff5f5f',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#ff5f5f',
            },
        }
    },
})(TextField);

function AutocompleteField(props) {

    return (
        <Grid item container={props.container} xs={props.xs} className={props.containerClass}>
            <Typography variant={props.typeVariant} className={props.typeClass}>
                {props.fieldLabel}
            </Typography>
            <Autocomplete
                size={'small'}
                className={props.fieldClass}
                id={props.fieldID}
                multiple={props.multiple}
                limitTags={props.limitTags}
                options={props.options}
                value={props.value}
                required={props.required}
                getOptionLabel={props.getOptionLabel}
                getOptionSelected={props.getOptionSelected}
                onChange={props.handleChange}
                disableCloseOnSelect={props.multiple ? true : false}
                disableClearable={props.disableClearable}
                disabled={props.disabled}
                renderInput={
                    (params) =>
                        <StyledTextField
                            {...params}
                            label={props.fieldInnerLabel}
                            variant={props.fieldVariant}
                            error={props.error}
                            helperText={props.helperText}
                            disabled={props.disabled}
                        />
                }
                renderTags={props.optionLabel ? (tagValue, getTagProps) =>
                    tagValue.map((option, index) => (
                        <Chip
                            size="small"
                            label={option[props.optionLabel]}
                            {...getTagProps({ index })}
                        />
                    ))
                    : null}
                ChipProps={props.chipProps}

            />
        </Grid>
    );
}

function NumericTextField(props) {

    return(
        <Grid item xs={props.xs} className={props.containerClass}>
            <Typography variant={props.typeVariant} className={props.typeClass}>
                {props.fieldLabel}
            </Typography>
            <NumberFormat
                size={'small'}
                customInput={StyledTextField}
                value={props.value}
                className={props.fieldClass}
                variant={props.fieldVariant}
                readOnly={props.readOnly}
                disabled={props.disabled}
                required={props.required}
                placeholder={props.placeholder}
                margin={props.margin}
                thousandSeparator={props.thousandSeparator}
                decimalScale={props.decimalScale}
                fixedDecimalScale={props.fixedDecimalScale}
                fullWidth={props.fullWidth}
                error={props.error}
                prefix={props.prefix}
                suffix={props.suffix}
                format={props.format}
                mask={props.mask}
                allowEmptyFormatting={props.allowEmptyFormatting}
                inputMode="numeric"
                allowNegative={false}
                onValueChange={props.onChange}
                helperText={props.helperText}
                isAllowed={props.isAllowed}
                allowLeadingZeros={props.allowLeadingZeros}
            />
        </Grid>
    );
}

export { AutocompleteField, NumericTextField }