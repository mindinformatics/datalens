setwd("~/Dropbox (Partners HealthCare)/MSBB/Pipelines/Data/MayoBB/CBE")
options(stringsAsFactors = FALSE)
library(data.table)


clinical = read.csv("MayoRNAseq_RNAseq_CBE_covariates.csv", header=T, stringsAsFactors=F)
dim(clinical)

#fread for large files
dataFile = fread("MayoRNAseq_RNAseq_CBE_geneCounts_normalized.tsv")
colnames(dataFile)


# Remove covariate information not also in dataFile
clinical_removes = subset(clinical, !(clinical$SampleID %in% colnames(dataFile)))
clinical_keeps = subset(clinical, (clinical$SampleID %in% colnames(dataFile)))
clinical = clinical_keeps

#Find NAs- keep this in mind for data clean up later.
#clinical[is.na(clinical$Source),]
#> clinical[is.na(clinical$Source),]
#SampleID Source Tissue RIN Diagnosis  Sex AgeAtDeath ApoE Flowcell
#95  11386_CER   <NA>   <NA>  NA      <NA> <NA>       <NA>   NA     <NA>
#244   742_CER   <NA>   <NA>  NA      <NA> <NA>       <NA>   NA     <NA>

row.names(clinical) = clinical$SampleID
clinical = t(clinical)
ensembl_id = row.names(clinical)
clinical = cbind(ensembl_id,clinical)
clinical = as.data.frame(clinical)
dropme = c("RIN","Flowcell")
clinical = clinical[!row.names(clinical) %in% dropme,]


# Get row of interest
#DCLK1: ENSG00000133083
dclk1_rows = dataFile[dataFile$ensembl_id == "ENSG00000133083",]
dclk1_dat = rbind(clinical, dclk1_rows)
dim(dclk1_dat)

# final data clean up- get rid of NAs ingering from clinical, and make easy to read.
dclk1_dat = t(dclk1_dat)
dclk1_dat = as.data.frame(dclk1_dat)
colnames(dclk1_dat) = dclk1_dat[1,]
dclk1_dat = dclk1_dat[!is.na(dclk1_dat$Source),]
dclk1_dat = dclk1_dat[-c(1),]
write.table(dclk1_dat, file="dclk1_data.csv", sep=",", row.names=FALSE, col.names=TRUE, quote=TRUE)

#APP: ENSG00000142192
app_rows = dataFile[dataFile$ensembl_id == "ENSG00000142192",]
app_dat = rbind(clinical,app_rows)
app_dat = t(app_dat)
app_dat = as.data.frame(app_dat)
colnames(app_dat) = app_dat[1,]
app_dat = app_dat[!is.na(app_dat$Source),]
app_dat = app_dat[-c(1),]

write.table(app_dat, file="app_data.csv", sep=",", row.names=FALSE, col.names=TRUE, quote=TRUE)





