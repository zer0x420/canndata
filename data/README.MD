# Data
All Data that is used in the App can be found in this Directory.  
The Data is saved as static YAML files in a folder structure that allows to create automatically all IDs. After a successful validation, the YAML is converted to JSON and all IDs will be automatically assigned, so it is important to read the `Structure` section. 

## Structure

### Strain
Each strain is given its own description as a single file, stored flat in a Folder. The file name of the strain is also used as the strain ID and is unique due the folder structure.

- `products/{strain-id}.yaml`

### Products
There can be 1:N products for each strain.
To realize this, each product is in a folder with the strain ID as its name. This automatically creates the relationship between product and strain. The file name is then also used as the product ID. 

- `products/{strain-id}/{product-id}.yaml`

### Reports
A report is assigned to a product that belongs to a strain. For this purpose, each report is assigned to a folder with the report ID as its name. This folder contains the YAML-File which must also have the report ID as its name. 

- `reports/{strain-id}/{product-id}/{report-id}/{report-id}.yaml`

Images (jpg, jpeg, png) referenced in the YAML can also be stored in this folder.

- `reports/{strain-id}/{product-id}/{report-id}/image1.png`
- `reports/{strain-id}/{product-id}/{report-id}/image2.png`

## Validation

To ensure that the data is always consistent and correct, the YAML files must be validated against the schema from `/schema`.

Auto-Validation runs for every pull-request, only successful ones will be approved.