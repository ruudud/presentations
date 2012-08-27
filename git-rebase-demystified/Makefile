# compiler

presentation.pdf: presentation.tex
	xelatex presentation.tex
	xelatex presentation.tex
	rm -rf *.aux *.log *.toc *.out *.lof *.lot *.bbl *.blg *.dvi *.nav *.vrb *.snm

show:
	open presentation.pdf

clean:
	rm -rf *.aux *.log *.toc *.out *.lof *.lot *.bbl *.blg *.dvi *.pdf *.vrb *.nav *.snm

all: clean presentation.pdf
display: clean presentation.pdf show

.PHONY: clean show
