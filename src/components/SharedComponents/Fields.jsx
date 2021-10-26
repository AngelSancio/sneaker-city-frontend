import {
    Grid,
    Typography,
    TextField,
    Chip,
    Autocomplete
} from '@mui/material';
import { withStyles } from '@mui/styles';

const StyledTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#4caf50',
        },
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                color: '#4caf50',
                borderColor: '#4caf50',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#4caf50',
            },
        },
    },
})(TextField);

function AutocompleteField(props) {

    return (
        <Grid item container={props.container} xs={props.xs} className={props.containerClass}>
            {
                props.fieldLabel ?
                    <Typography variant={props.typeVariant} className={props.typeClass}>
                        {props.fieldLabel}
                    </Typography> : ''
            }
            <Autocomplete
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
                            margin="dense"
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

export { AutocompleteField }