setwd("~/Sites/cats/sites/all/libraries/d3.scatterman")
options(stringsAsFactors = FALSE)
library(data.table)
#install.packages("Rmpfr")
library(Rmpfr)


#dat <- fread("ad_meta_analysis_filtered_0.05.tsv")
dat = read.table("IGAP_stage_1_filtered.tsv", header=T, as.is=T, sep="\t", colClasses="character", fill=T)
dat$logpval = as.numeric(-log10(mpfr(dat$Pvalue)))
dat$chr = as.numeric(dat$chr)
dat$cumulative_pos = as.numeric(dat$cumulative_pos)
dat <- dat[order(dat$cumulative_pos),] 
head(dat)

unique(dat$chr)
dat$color[dat$chr %% 2 == 0] = "pink"
dat$color[dat$chr %% 2 != 0] = "blue"
unique(dat$color)
colnames(dat)
# Change P-value to Pvalue
# Change to HGNC_nearest_gene_snpsnap_protein_coding to HGNC
colnames(dat)[8] = "Pvalue"
colnames(dat)[15] = "HGNC"



# Check
chrs = unique(dat$chr)

# Find points for labels
sapply(chrs, function(chr) {
  dat1=dat[dat$chr== chr,]
  mid=(min(dat1$cumulative_pos) + max(dat1$cumulative_pos))/2
  dat$xlabel[dat$chr== chr] <<- mid
})


write.table(dat, file="IGAP_stage_1_filtered.csv", sep=",", row.names=FALSE, col.names=TRUE, quote=FALSE)


# if(chr == 25) {
#   dat2=dat[dat$chr== chr-3,]
#   max2=max(dat2$cumulative_pos)
# } else if(chr == 1) {
#   
# } else {
#   dat2=dat[dat$chr== chr-1,]
#   max2=max(dat2$cumulative_pos)
# }


####### To create mongo file- must have analysis name
mongo1 = read.csv("IGAP_stage_1_filtered.csv", header=T, as.is=T, colClasses="character", fill=T)
colnames(mongo1)
# Remove NA and make blank
mongo1[is.na(mongo1)] <- ""
# Add analysis name
#IGAP_stage_1_filtered.csv
mongo1$FileName = "IGAP_stage_1_filtered.csv"
#mongo1$Analysis = "IGAP-Stage1-Filtered"

write.table(mongo1, file="IGAP_stage_1_filtered_mongo.csv", sep=",", row.names=FALSE, col.names=TRUE, quote=FALSE)
