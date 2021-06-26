import React from 'react'

import {
    List, Show, Delete, Datagrid, EmailField, TextField, EditButton,
    DateField, ChipField, ShowButton, required, SimpleForm, Edit,
    TextInput, SelectInput, Filter, FunctionField, ReferenceField,
    TabbedShowLayout, Tab, ReferenceManyField, ReferenceInput,
    AutocompleteInput, NumberInput, Create, BooleanInput,
    SimpleShowLayout
} from 'react-admin'

import RouterIcon from '@material-ui/icons/Router'

import { ucFirst } from '../utils/common'

export const ReportIcon = RouterIcon

const ReportFilter = props => (
    <Filter {...props}>
        <SelectInput source="state" choices={[
            {id: 'OPEN', name: 'Open'},
            {id: 'BLOCKED', name: 'Blocked'},
            {id: 'RESOLVED', name: 'Resolved'},
        ]} alwaysOn />
    </Filter>
)

export const ReportList = props => (
    <List title="Reports" {...props} filters={<ReportFilter />} bulkActionButtons={false}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="state" />
            <TextField source="source" />
            <TextField source="payload.reportType" label="Type" sortable={false} />
            <FunctionField label="Reference" render={({ reference }) =>  <span label={reference.referenceId}>{reference.referenceType}</span> } />
            <FunctionField label="Resource" render={({ payload }) => <span label={payload.referenceResourceId}>{payload.referenceResourceType}</span> } />
            <TextField source="payload.message" label="Message" sortable={false} />
            <DateField source="createdAt" />
            <ShowButton />
            <EditButton />
        </Datagrid>
    </List>
)

export const ReportEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <SelectInput source="state" choices={[
                {id: 'OPEN', name: 'Open'},
                {id: 'BLOCKED', name: 'Blocked'},
                {id: 'RESOLVED', name: 'Resolved'},
            ]} />
        </SimpleForm>
    </Edit>
)

export const ReportShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="state" />
            <TextField source="source" />
            <TextField source="sourceIdentityId" />
            <TextField source="reference.referenceId" label="Reference id" />
            <TextField source="reference.referenceType" label="Reference type" />
            <TextField source="payload.source" />
            <TextField source="payload.reportType" />
            <TextField source="payload.message" />
            <TextField source="payload.reportId" />
            <TextField source="payload.referenceResourceId" />
            <TextField source="payload.referenceResourceType" />
            <TextField source="payload.reportType" label="Type" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
        </SimpleShowLayout>
    </Show>
)
