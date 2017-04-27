setwd("~/Sites/cats/sites/all/libraries/d3.fd/")
options(stringsAsFactors = FALSE)



#dat <- fread("ad_meta_analysis_filtered_0.05.tsv")
dat <- read.table("Tau.tsv", sep="\t", header=TRUE)
head(dat)

all=c(dat$source,dat$target)
genes=unique(all)
groups=c(rep(1,5), rep(2,5),rep(3,5), rep(4,5),rep(5,2))

dat1=cbind(genes, groups)
write.csv(dat1,"Tau-genes.csv", row.names = F)

