setwd("~/Sites/cats/sites/all/libraries/d3.scattercsv2")
options(stringsAsFactors = FALSE)
library(data.table)

dat <- fread("MSBB_HIPP_Braak_CERAD.csv")
head(dat)


dat1 <- dat[((dat$PValue < 0.01) | (dat$PValue1 < 0.01)),]
write.table(dat1, file="MSBB_HIPP_Braak_CERAD_Pval.csv", sep=",", row.names=FALSE, col.names=TRUE, quote=FALSE)
max(dat1$logFC)
min(dat1$logFC)
dat1$color[dat1$logFC > 0 & dat1$logFC1] = "color1"
dat1$color[dat1$logFC < 0] = "color2"
dat1$color[dat1$logFC < -1] = "color3"
write.table(dat1, file="MSBB_HIPP_Braak_CERAD_Pval.csv", sep=",", row.names=FALSE, col.names=TRUE, quote=FALSE)
plot(dat1$logFC, dat1$logFC1)


### New
dat <- fread("results.tsv")
head(dat)

dat1 = dat[,c("GeneSymbol","ROSMAP_PFC_FPKM_CpDxLow_AD_NCI_logFC","MayoEGWAS_eQTL_TCX_AD_Pvalue","IGAP_1_Pvalue")]
colnames(dat1) = c("GeneSymbol","logFC","color","Pval")
dat1$Pval = -log10(dat1$Pval)
dat1 = dat1[!is.na(dat1$Pval)]
#sum(is.na(dat1$Pval))
range(dat1$color, na.rm = T)
dat1[is.na(dat1),] = 1
sum(dat1$color < .000001)
dat1$color[dat1$color > .000001] = "Not Significant"
dat1$color[as.numeric(dat1$color) < .000001] = "eQTL pval < 1.0E-6"
dat1$color[dat1$Pval >= 6] = "GWAS pval < 1.0E-6"
table(dat1$color)
write.table(dat1, file="ROSMAP-logFC-GWAS-Pval.csv", sep=",", row.names=FALSE, col.names=TRUE, quote=FALSE)
