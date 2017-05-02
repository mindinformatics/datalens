setwd("~/Sites/cats/sites/all/libraries/d3.fd/")
options(stringsAsFactors = FALSE)


dat <- read.table("genemania-network.tsv", sep="\t", header=TRUE)
#dat <- read.table("Tau.tsv",  sep="\t", header=TRUE)
head(dat)

all=c(dat$Entity.1,dat$Entity.2)
name=unique(all)

group=rep(1,69)

dat1=cbind(name, group)
write.csv(dat1,"snp-genes.csv", row.names = F)

dat$source = match(dat$Entity.1, name)-1
dat$target = match(dat$Entity.2, name)-1

dat2=dat[dat$Network.group != "Co-expression",]

#write.csv(dat,"Tau-w-id.csv", row.names = F)
write.csv(dat,"snp-links.csv", row.names = F)
write.csv(dat2,"snp-links-wo-coexp.csv", row.names = F)

exp=read.csv("/Users/sdas/Dropbox (Partners HealthCare)/MSBB/mongo/mongo_ROSMAP_PFC_FPKM_Braak_B3-B1.csv")

all_logFC = exp[match(name,exp$GeneSymbol), "logFC"]
all_logFC[is.na(all_logFC)] <- 0
genes=read.csv("snp-genes.csv")
dat3=cbind(genes,real_fc(all_logFC))
write.csv(dat1,"snp-genes.csv", row.names = F)


real_fc <- function(x) {
 x=2^x
 for(i in 1:length(x))
  if(x[i]<1) {
    x[i]=-1/x[i] 
  }
 return(x)
}
 