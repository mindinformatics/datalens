setwd("~/Sites/cats/sites/all/libraries/d3.scatterman")
options(stringsAsFactors = FALSE)
library(data.table)

dat <- fread("ad_meta_analysis_filtered_0.001.tsv")
head(dat)

unique(dat$chr)
dat$color[dat$chr %% 2 == 0] = "pink"
dat$color[dat$chr %% 2 != 0] = "blue"
unique(dat$color)
write.table(dat, file="ad_meta_analysis_filtered_0.001.csv", sep=",", row.names=FALSE, col.names=TRUE, quote=FALSE)


dat <- fread("ad_meta_analysis_filtered_0.05.tsv")
require(bit64)
head(dat)

unique(dat$chr)
dat$color[dat$chr %% 2 == 0] = "pink"
dat$color[dat$chr %% 2 != 0] = "blue"
unique(dat$color)
write.table(dat, file="ad_meta_analysis_filtered_0.05.csv", sep=",", row.names=FALSE, col.names=TRUE, quote=FALSE)

# Change P-value to Pvalue
# Change to HGNC_nearest_gene_snpsnap_protein_coding to HGNC