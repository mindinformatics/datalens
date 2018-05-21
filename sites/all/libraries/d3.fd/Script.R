setwd("~/Sites/cats/sites/all/libraries/d3.fd/")
options(stringsAsFactors = FALSE)


#dat <- read.table("genemania-network.tsv", sep="\t", header=TRUE)
#dat <- read.table("Tau.tsv",  sep="\t", header=TRUE)
dat <- read.table("genemania-interactions.txt",  sep="\t", header=TRUE)
head(dat)

dat2=dat[dat$Network.group == "Physical Interactions" | dat$Network.group == "Pathway",]

all=c(dat2$Gene.1,dat2$Gene.2)
name=unique(all)
group=rep(1,length(name))
dat1=cbind(name, group)

dat2$source = match(dat2$Gene.1, name)-1
dat2$target = match(dat2$Gene.2, name)-1

write.csv(dat1,"snp-genes-ca.csv", row.names = F)

colnames(dat2)<-c("Entity.1","Entity.2","Weight",	"Network.group",	"Network",	"source",	"target")
write.csv(dat2,"snp-links-wo-coexp-ca.csv", row.names = F)

#exp=read.csv("/Users/sdas/Dropbox (Partners HealthCare)/MSBB/mongo/Yann/mongo_ROSMAP_PFC_CpDxLow_AD-NCI.csv")
exp=read.csv("~/Dropbox (Partners HealthCare)/CATS-MIND/DataLENS_Paper/results.tsv", sep="\t", header=T)
all = exp[match(name,exp$GeneSymbol), c("ROSMAP_PFC_FPKM_CpDxLow_AD_NCI_logFC","ROSMAP_PFC_FPKM_CpDxLow_AD_NCI_adj.P.Val","IGAP_1_Pvalue","MayoEGWAS_eQTL_TCX_AD_Pvalue")]
all[is.na(all)] <- 0
all$fc= real_fc(all$ROSMAP_PFC_FPKM_CpDxLow_AD_NCI_logFC)
all$log10_exp=log10(all$ROSMAP_PFC_FPKM_CpDxLow_AD_NCI_adj.P.Val)
all$log10_IGAP=log10(all$IGAP_1_Pvalue)
all$log10_eQTL=log10(all$MayoEGWAS_eQTL_TCX_AD_Pvalue)
all$log10_exp[is.infinite(all$log10_exp)]<-0
all$log10_eQTL[is.infinite(all$log10_eQTL)]<-0
all$log10_IGAP[is.infinite(all$log10_IGAP)]<-0

genes=read.csv("snp-genes-ca.csv")
dat3=cbind(genes,all)
dat3$group[dat3$fc == 1]=20
dat3=dat3[,-c(3,4,5,6)]
write.csv(dat3,"snp-genes-ca.csv", row.names = F)


real_fc <- function(x) {
 x=2^x
 for(i in 1:length(x))
  if(x[i]<1) {
    x[i]=-1/x[i] 
  }
 return(x)
}
 