setwd("~/Sites/cats/sites/all/libraries/d3.scatterman")
options(stringsAsFactors = FALSE)
library(data.table)
#install.packages("Rmpfr")
library(Rmpfr)


#dat <- fread("ad_meta_analysis_filtered_0.05.tsv")
dat <- read.table("IGAP_stage_1_filtered.tsv", header=T, as.is=T, sep="\t", colClasses="character", fill=T)
dat$logpval <- as.numeric(-log10(mpfr(data$pval)))
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


chrs = unique(dat$chr)

sapply(chrs, function(chr) {
  dat1=dat[dat$chr== chr,]
  if(chr == 25) {
    dat2=dat[dat$chr== chr-3,]
    max2=max(dat2$cumulative_pos)
  } else if(chr == 1) {
    
  }else {
    dat2=dat[dat$chr== chr-1,]
    max2=max(dat2$cumulative_pos)
  }
  
  mid=median(dat1$cumulative_pos)
  
  dat$xlabel[dat$chr== chr] <<- mid

})


write.table(dat, file="IGAP_stage_1_filtered_new.csv", sep=",", row.names=FALSE, col.names=TRUE, quote=FALSE)

