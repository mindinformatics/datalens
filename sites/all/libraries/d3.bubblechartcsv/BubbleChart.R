setwd("~/Sites/cats/sites/all/libraries/d3.bubblechartcsv")
options(stringsAsFactors = FALSE)
library(data.table)
library(dplyr)

realfc <- function (x) {
  fc=ifelse(x>0,2^x,-1/2^x)
  return(fc)
}

analysisFile = read.table("~/Dropbox (Partners HealthCare)/MSBB//Methods/Output/main.csv", sep=",", header=T, stringsAsFactors=F)
head(analysisFile)
colnames(analysisFile)


mouse_gene_list<-read.csv("~/Dropbox (Partners HealthCare)/CATS-OMICS/Queries/HymanHurdy/mouse-genes.csv", sep=",", header = T)
mouse_human<-read.csv("~/Dropbox (Partners HealthCare)/CATS-OMICS/Queries/HymanHurdy/mapped_orthologs.tab_delimited.xls", sep="\t", header = T)
genes=mouse_human[mouse_human$Homology.Type != "", "Human.Gene.Symbol"]


analysisFile=analysisFile[(analysisFile$Contrast == "B3-B1"), ] # Choose just B3-B1 and RNA-Seq

header=c("study", "bregion", "cbregion", "dtype", "contrast", "type", "GeneSymbol", "logFC", "FC", "P.Value", "adj.P.Val")

write.table(t(header), "B3-B1-APOE.csv", sep ="," , col.names = F, row.names = F, na = "")

sapply(seq_along(analysisFile$FileName), function(i) {if (analysisFile$PipelineScript[i] == "uArray_pipeline.R" | analysisFile$PipelineScript[i] == "RNASeq_pipeline.R") {
  print(i)
  bregion = analysisFile$BrainRegionFull[i]
  cbregion = analysisFile$ClusteredBrainRegion[i]
  study = analysisFile$StudyName[i]
  contrast = analysisFile$Contrast[i]
  type=analysisFile$DataType[i]
  if (analysisFile$PipelineScript[i] == "uArray_pipeline.R") { dtype <- "Microarray" }
  if (analysisFile$PipelineScript[i] == "RNASeq_pipeline.R") { dtype <- "RNA-Seq" }
  fname= paste("~/Dropbox (Partners HealthCare)/MSBB/Pipelines/",analysisFile$Folder[i], analysisFile$FileName[i], sep="")
  dat<-fread(fname)

  x<-grep("Gene.symbol",colnames(dat))
  if(length(x) == 0) {colnames(dat)[x] <- "GeneSymbol"}

  v1<-filter(dat, GeneSymbol %in% genes)

  #v2<- v1[as.numeric(v1$P.Value)< 0.05,]
  v2<-do.call(rbind, lapply(split(v1,as.factor(v1$GeneSymbol)), function(x) {return(x[which.min(x$P.Value),])}))

  v3<-cbind(study, bregion, cbregion,  dtype, contrast, type, v2$GeneSymbol,v2$logFC, realfc(v2$logFC), v2$P.Value, v2$adj.P.Val)

  write.table(v3, "B3-B1-APOE.csv", sep =",", append = T, col.names = F, row.names = F) # Change Here

  return(dim(v3))
  }
}
)

fname="B3-B1-APOE.csv"
#dat<-read.csv("", header = T)
#sum(p.adjust(dat$P.Value, method="BH") < 0.30)

## Revised analysis
dat<-read.csv(fname, header = T, stringsAsFactors = F)

dat=dat[dat$type!="RC",]
#dat=dat[dat$dtype != "RNA-Seq",] ??

# First adjust for RNA-Seq and microarray for the 5 regions that have both
genes=unique(dat$GeneSymbol)
p1 = rbind.data.frame()
for(gene in genes) {
  print(gene)
  dat_gene=dat[dat$GeneSymbol == gene,]

  bregions = unique(dat_gene$bregion)
  for( br in bregions) {
    print(br)
    dat_br=dat_gene[dat_gene$bregion == br,]
    dat_br=dat_br[order(dat_br$P.Value),]
    N=dim(dat_br)[1]
    rank=1:nrow(dat_br)
    p1=rbind(p1,cbind(dat_br,P1.BF=dat_br$P.Value*N,P1.BH=dat_br$P.Value*N/rank))
  }
}

#write.table(p1, "Bennet/genes-out-choose-probe-pvalue-new1.csv", sep =",", col.names = T, row.names = F, na="")

# Next adjust for 19 brain regions
p2 = rbind.data.frame()
for(gene in genes) {
  print(gene)
  dat_gene=p1[p1$GeneSymbol == gene,]
  dat_gene=dat_gene[order(dat_gene$P.Value),]

  bregions = unique(dat_gene$bregion)
  N=dim(dat_gene)[1]
  rank=1:nrow(dat_gene)
  p.adj=p.adjust(dat_gene$P1.BH, method="BH")
  p2=rbind(p2,cbind(dat_gene,P2.BF=dat_gene$P1.BF*N,P2.BH=dat_gene$P1.BH*N/rank, p.adj))
}

p2$P1.BF = ifelse(p2$P1.BF > 1, 1,p2$P1.BF)
p2$P1.BH = ifelse(p2$P1.BH > 1, 1,p2$P1.BH)
p2$P2.BF = ifelse(p2$P2.BF > 1, 1,p2$P2.BF)
p2$P2.BH = ifelse(p2$P2.BH > 1, 1,p2$P2.BH)

sum(p2$P2.BH < 0.10)
sum(p2$p.adj < 0.25)

#sum(p.adjust(dat$P.Value, method="BH") < 0.25)
#dat$p.adjusted=p.adjust(dat$P.Value, method="BH")
fname1="B3-B1-with-p.adjust.csv"
write.table(p2, fname1, sep =",", col.names = T, row.names = F, na="")

# Create a file for bubble chart
dat=read.csv(fname1, header = T)
dat1=dat[dat$p.adj < 0.1, c("study","bregion","dtype","contrast","GeneSymbol","logFC","FC","P.Value","adj.P.Val") ]
colnames(dat1)=c("Study","parent","DataType","Contrast","name","LogFC","size","PValue","AdjPValue")
dat1$size=abs(dat1$LogFC)

xx=data.frame(table(dat1$name, dat1$parent)) ## check for multiple probes
brparents = read.csv("~/Dropbox (Partners HealthCare)/CATS-OMICS/Queries/HymanHurdy/BrainRegionParents.csv", header = T)

uparents = unique(dat1$parent)
dat2 = data.frame("", brparents[match(uparents, brparents$BrainRegion), "Parent"], "", "", uparents, "", "5", "","")
colnames(dat2)=c("Study","parent","DataType","Contrast","name","LogFC","size","PValue","AdjPValue")

uparents = unique(dat2$parent)
dat3 = data.frame("", brparents[match(uparents, brparents$BrainRegion), "Parent"], "", "", uparents, "", "5", "","")
colnames(dat3)=c("Study","parent","DataType","Contrast","name","LogFC","size","PValue","AdjPValue")

uparents = unique(dat3$parent)
dat4 = data.frame("", brparents[match(uparents, brparents$BrainRegion), "Parent"], "", "", uparents, "", "5", "","")
colnames(dat4)=c("Study","parent","DataType","Contrast","name","LogFC","size","PValue","AdjPValue")

dat_all=rbind(dat4, dat3, dat2, dat1)
colnames(dat_all)=c("Study","parent","DataType","Contrast","name","LogFC","size","PValue","AdjPValue")

write.table(dat_all, "B3-B1-Bubblechart.csv", sep =",", col.names = T, row.names = F, na="")


## Reviewer #4 comments choose most significant probe
dat=read.csv("Bennet/genes-out-choose-probe-pvalue-BH.csv", header = T)
dat1=dat[dat$p.adjusted < 0.25, c("study","bregion","dtype","contrast","GeneSymbol","logFC","FC","P.Value","p.adjusted") ]
tdat=data.frame(table(dat1$GeneSymbol, dat1$bregion))

## Check code
pval=read.csv("Bennet/mmp9.txt", header = T)
p.adjust(pval$pval, method = "BH")
